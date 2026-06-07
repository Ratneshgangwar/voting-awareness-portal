// src/components/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const Signup = ({ setCurrentPage, onLogin, language }) => {
  const [formData, setFormData] = useState({
    username: '',
    fatherName: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    constituency: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username)
      newErrors.username = language === 'hindi' ? 'उपयोगकर्ता नाम आवश्यक है' : 'Username is required';

    if (!formData.fatherName)
      newErrors.fatherName = language === 'hindi' ? 'पिता का नाम आवश्यक है' : 'Father\'s name is required';

    if (!formData.dob)
      newErrors.dob = language === 'hindi' ? 'जन्म तिथि आवश्यक है' : 'Date of birth is required';

    if (!formData.constituency)
      newErrors.constituency = language === 'hindi' ? 'निर्वाचन क्षेत्र आवश्यक है' : 'Constituency is required';

    if (!formData.email)
      newErrors.email = language === 'hindi' ? 'ईमेल आवश्यक है' : 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = language === 'hindi' ? 'वैध ईमेल दर्ज करें' : 'Enter valid email';

    if (!formData.password)
      newErrors.password = language === 'hindi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = language === 'hindi'
        ? 'पासवर्ड 6 अक्षरों से लंबा होना चाहिए'
        : 'Password must be at least 6 characters';

    if (!formData.confirmPassword)
      newErrors.confirmPassword = language === 'hindi'
        ? 'पासवर्ड की पुष्टि करें'
        : 'Confirm your password';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = language === 'hindi'
        ? 'पासवर्ड मेल नहीं खाते'
        : 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});

    try {
      // ✅ Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // ✅ Save user details to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username: formData.username,
        fatherName: formData.fatherName,
        dob: formData.dob,
        email: formData.email,
        constituency: formData.constituency,
        createdAt: new Date(),
        isEligible: calculateAge(formData.dob) >= 18,
        badges: ['newVoter'],
        progress: 10
      });

      // ✅ Gamification: notify backend about signup-related achievements
      try {
        // registration completed
        await fetch("http://localhost:5000/api/gamification/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "registration_completed" }),
        });

        // profile completed / new voter
        await fetch("http://localhost:5000/api/gamification/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "profile_completed" }),
        });
      } catch (gamiErr) {
        console.error("Gamification update failed after signup:", gamiErr);
      }

      // ✅ Auto-login the user
      const userData = {
        uid: user.uid,
        username: formData.username,
        fatherName: formData.fatherName,
        dob: formData.dob,
        email: formData.email,
        constituency: formData.constituency
      };

      onLogin(userData);
    } catch (error) {
      console.error('Signup error:', error);

      let message = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = language === 'hindi'
            ? 'यह ईमेल पहले से पंजीकृत है। कृपया लॉगिन करें।'
            : 'This email is already registered. Please login instead.';
          break;
        case 'auth/invalid-email':
          message = language === 'hindi'
            ? 'अमान्य ईमेल पता।'
            : 'Invalid email address.';
          break;
        case 'auth/weak-password':
          message = language === 'hindi'
            ? 'पासवर्ड बहुत कमजोर है।'
            : 'Password is too weak.';
          break;
        case 'permission-denied':
        case 'firestore/permission-denied':
          message = language === 'hindi'
            ? 'डेटाबेस अनुमति त्रुटि। कृपया Firestore नियम जांचें।'
            : 'Database permission error. Please check Firestore rules.';
          break;
        default:
          message = language === 'hindi'
            ? 'साइनअप में त्रुटि: ' + error.message
            : 'Signup error: ' + error.message;
      }

      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  const constituencies = [
    'Delhi',
    'Mumbai North',
    'Mumbai South',
    'Bangalore North',
    'Bangalore South',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Ahmedabad',
    'Pune'
  ];

  const translations = {
    hindi: {
      title: "साइन अप करें",
      username: "उपयोगकर्ता नाम",
      fatherName: "पिता का नाम",
      dob: "जन्म तिथि",
      constituency: "निर्वाचन क्षेत्र",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      signup: "साइन अप",
      haveAccount: "पहले से खाता है?",
      login: "लॉगिन करें",
      loading: "साइनअप हो रहा है...",
      placeholder: {
        username: "अपना उपयोगकर्ता नाम दर्ज करें",
        fatherName: "अपने पिता का नाम दर्ज करें",
        constituency: "अपना निर्वाचन क्षेत्र चुनें",
        email: "अपना ईमेल दर्ज करें",
        password: "पासवर्ड बनाएं",
        confirmPassword: "पासवर्ड की पुष्टि करें"
      }
    },
    english: {
      title: "Sign Up",
      username: "Username",
      fatherName: "Father's Name",
      dob: "Date of Birth",
      constituency: "Constituency",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      signup: "Sign Up",
      haveAccount: "Already have an account?",
      login: "Login",
      loading: "Signing up...",
      placeholder: {
        username: "Enter your username",
        fatherName: "Enter your father's name",
        constituency: "Select your constituency",
        email: "Enter your email",
        password: "Create password",
        confirmPassword: "Confirm your password"
      }
    }
  };

  const t = translations[language];

  return (
    <div className="form-container">
      <h2>{t.title}</h2>
      <form onSubmit={handleSubmit}>
        {[
          { id: 'username', label: t.username, type: 'text', placeholder: t.placeholder.username },
          { id: 'fatherName', label: t.fatherName, type: 'text', placeholder: t.placeholder.fatherName },
          { id: 'dob', label: t.dob, type: 'date' },
          { id: 'email', label: t.email, type: 'email', placeholder: t.placeholder.email },
          { id: 'password', label: t.password, type: 'password', placeholder: t.placeholder.password },
          { id: 'confirmPassword', label: t.confirmPassword, type: 'password', placeholder: t.placeholder.confirmPassword }
        ].map(({ id, label, type, placeholder }) => (
          <div key={id} className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
              type={type}
              id={id}
              name={id}
              value={formData[id]}
              onChange={handleChange}
              placeholder={placeholder}
              className={errors[id] ? 'error' : ''}
            />
            {errors[id] && <span className="error-text">{errors[id]}</span>}
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="constituency">{t.constituency}</label>
          <select
            id="constituency"
            name="constituency"
            value={formData.constituency}
            onChange={handleChange}
            className={errors.constituency ? 'error' : ''}
          >
            <option value="">{t.placeholder.constituency}</option>
            {constituencies.map((constituency, index) => (
              <option key={index} value={constituency}>
                {constituency}
              </option>
            ))}
          </select>
          {errors.constituency && <span className="error-text">{errors.constituency}</span>}
        </div>

        {errors.submit && <div className="error-text mb-3">{errors.submit}</div>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? t.loading : t.signup}
        </button>
      </form>

      <div className="form-links">
        <p>
          {t.haveAccount}
          <a href="#" onClick={() => setCurrentPage('login')}> {t.login}</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
