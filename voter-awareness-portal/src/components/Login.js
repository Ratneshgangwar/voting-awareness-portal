// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const Login = ({ setCurrentPage, onLogin, language }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email)
      newErrors.email = language === 'hindi' ? 'ईमेल आवश्यक है' : 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = language === 'hindi' ? 'वैध ईमेल दर्ज करें' : 'Enter valid email';

    if (!formData.password)
      newErrors.password = language === 'hindi' ? 'पासवर्ड आवश्यक है' : 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // ✅ Authenticate user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // ✅ Fetch user profile from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        onLogin(userData); // Redirect to dashboard or next screen
      } else {
        // User exists in Auth but not in Firestore
        const msg =
          language === 'hindi'
            ? 'उपयोगकर्ता डेटा नहीं मिला। कृपया फिर से साइन अप करें।'
            : 'User data not found. Please sign up again.';
        setErrors({ submit: msg });
      }
    } catch (error) {
      console.error('Login error:', error);

      let message = '';
      switch (error.code) {
        case 'auth/user-not-found':
          message =
            language === 'hindi'
              ? 'यह ईमेल पंजीकृत नहीं है। कृपया साइन अप करें।'
              : 'This email is not registered. Please sign up first.';
          break;
        case 'auth/wrong-password':
          message =
            language === 'hindi'
              ? 'गलत पासवर्ड। कृपया पुनः प्रयास करें।'
              : 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          message =
            language === 'hindi'
              ? 'अमान्य ईमेल पता।'
              : 'Invalid email address.';
          break;
        case 'permission-denied':
          message =
            language === 'hindi'
              ? 'डेटाबेस अनुमति त्रुटि। कृपया Firestore नियम जांचें।'
              : 'Database permission error. Please check Firestore rules.';
          break;
        default:
          message =
            language === 'hindi'
              ? 'लॉगिन में त्रुटि: ' + error.message
              : 'Login error: ' + error.message;
      }

      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    hindi: {
      title: "लॉगिन करें",
      email: "ईमेल",
      password: "पासवर्ड",
      login: "लॉगिन",
      noAccount: "खाता नहीं है?",
      signup: "साइन अप करें",
      loading: "लॉगिन हो रहा है...",
      placeholder: {
        email: "अपना ईमेल दर्ज करें",
        password: "अपना पासवर्ड दर्ज करें"
      }
    },
    english: {
      title: "Login",
      email: "Email",
      password: "Password",
      login: "Login",
      noAccount: "Don't have an account?",
      signup: "Sign Up",
      loading: "Logging in...",
      placeholder: {
        email: "Enter your email",
        password: "Enter your password"
      }
    }
  };

  const t = translations[language];

  return (
    <div className="form-container">
      <h2>{t.title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">{t.email}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.placeholder.email}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">{t.password}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t.placeholder.password}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        {errors.submit && <div className="error-text mb-3">{errors.submit}</div>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? t.loading : t.login}
        </button>
      </form>

      <div className="form-links">
        <p>
          {t.noAccount}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('signup');
            }}
          >
            {' '}{t.signup}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
