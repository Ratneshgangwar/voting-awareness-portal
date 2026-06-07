// src/components/ContactUs.js
import React, { useState } from 'react';

const ContactUs = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const translations = {
    hindi: {
      title: "हमसे संपर्क करें",
      subtitle: "किसी भी प्रश्न या सहायता के लिए हमें संदेश भेजें",
      name: "आपका नाम",
      email: "ईमेल",
      subject: "विषय",
      message: "संदेश",
      send: "संदेश भेजें",
      success: "धन्यवाद! आपका संदेश भेज दिया गया है।",
      placeholder: {
        name: "अपना पूरा नाम दर्ज करें",
        email: "अपना ईमेल दर्ज करें",
        subject: "संदेश का विषय",
        message: "अपना संदेश यहाँ लिखें..."
      },
      contactInfo: "संपर्क जानकारी",
      address: "पता",
      phone: "फोन",
      emailLabel: "ईमेल",
      addressDetails: "युवा मतदाता जागरूकता केंद्र, नई दिल्ली - 110001",
      phoneDetails: "+91-9876543210",
      emailDetails: "contact@voterawareness.org"
    },
    english: {
      title: "Contact Us",
      subtitle: "Send us a message for any questions or support",
      name: "Your Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      success: "Thank you! Your message has been sent.",
      placeholder: {
        name: "Enter your full name",
        email: "Enter your email",
        subject: "Subject of your message",
        message: "Write your message here..."
      },
      contactInfo: "Contact Information",
      address: "Address",
      phone: "Phone",
      emailLabel: "Email",
      addressDetails: "Youth Voter Awareness Center, New Delhi - 110001",
      phoneDetails: "+91-9876543210",
      emailDetails: "contact@voterawareness.org"
    }
  };

  const t = translations[language];

  return (
    <div className="contact-section">
      <div className="container">
        <h2>{t.title}</h2>
        <p className="contact-subtitle">{t.subtitle}</p>
        
        <div className="contact-content">
          <div className="contact-form-container">
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>{t.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">{t.name}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.placeholder.name}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.placeholder.email}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">{t.subject}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.placeholder.subject}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.placeholder.message}
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  {t.send}
                </button>
              </form>
            )}
          </div>

          <div className="contact-info">
            <h3>{t.contactInfo}</h3>
            <div className="contact-details">
              <div className="contact-item">
                <strong>📍 {t.address}:</strong>
                <p>{t.addressDetails}</p>
              </div>
              <div className="contact-item">
                <strong>📞 {t.phone}:</strong>
                <p>{t.phoneDetails}</p>
              </div>
              <div className="contact-item">
                <strong>📧 {t.emailLabel}:</strong>
                <p>{t.emailDetails}</p>
              </div>
            </div>

            <div className="official-links">
              <h4>{language === 'hindi' ? "आधिकारिक लिंक" : "Official Links"}</h4>
              <div className="links">
                <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">
                  Election Commission of India
                </a>
                <a href="https://nvsp.in" target="_blank" rel="noopener noreferrer">
                  National Voter Service Portal
                </a>
                <a href="https://www.mygov.in" target="_blank" rel="noopener noreferrer">
                  MyGov India
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;