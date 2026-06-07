// src/components/Footer.js
import React from 'react';

const Footer = ({ language }) => {
  const translations = {
    hindi: {
      about: "हमारे बारे में",
      aboutText: "युवा मतदाता जागरूकता पोर्टल - भारत के युवाओं को उनके मतदान अधिकारों से अवगत कराने का मिशन।",
      quickLinks: "त्वरित लिंक",
      governmentLinks: "सरकारी लिंक",
      contact: "संपर्क",
      address: "युवा मतदाता जागरूकता केंद्र, नई दिल्ली",
      phone: "+91-9876543210",
      email: "contact@voterawareness.org",
      catchyLine: "आपका एक वोट, देश का भविष्य - जागो, जुड़ो, जीतो!",
      rights: "सभी अधिकार सुरक्षित",
      links: {
        home: "मुखपृष्ठ",
        eligibility: "पात्रता जांच",
        candidate: "उम्मीदवार जानें",
        faq: "सामान्य प्रश्न",
        contact: "संपर्क करें"
      },
      govLinks: {
        eci: "निर्वाचन आयोग",
        nvsp: "राष्ट्रीय मतदाता सेवा",
        mygov: "माईगव",
        digilocker: "डिजीलॉकर"
      }
    },
    english: {
      about: "About Us",
      aboutText: "Youth Voter Awareness Portal - Mission to educate India's youth about their voting rights.",
      quickLinks: "Quick Links",
      governmentLinks: "Government Links",
      contact: "Contact",
      address: "Youth Voter Awareness Center, New Delhi",
      phone: "+91-9876543210",
      email: "contact@voterawareness.org",
      catchyLine: "Your One Vote, Nation's Future - Awake, Connect, Conquer!",
      rights: "All rights reserved",
      links: {
        home: "Home",
        eligibility: "Eligibility Check",
        candidate: "Know Candidate",
        faq: "FAQ",
        contact: "Contact Us"
      },
      govLinks: {
        eci: "Election Commission",
        nvsp: "Voter Service Portal",
        mygov: "MyGov India",
        digilocker: "DigiLocker"
      }
    }
  };

  const t = translations[language];

  return (
    <footer className="footer">
      <div className="container">
        <div className="catchy-line">
          "{t.catchyLine}"
        </div>
        
        <div className="footer-content">
          <div className="footer-section">
            <h3>{t.about}</h3>
            <p>{t.aboutText}</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>

          <div className="footer-section">
            <h3>{t.quickLinks}</h3>
            <ul className="footer-links">
              <li><a href="#home">{t.links.home}</a></li>
              <li><a href="#eligibility">{t.links.eligibility}</a></li>
              <li><a href="#candidate">{t.links.candidate}</a></li>
              <li><a href="#faq">{t.links.faq}</a></li>
              <li><a href="#contact">{t.links.contact}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>{t.governmentLinks}</h3>
            <ul className="footer-links">
              <li>
                <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">
                  {t.govLinks.eci}
                </a>
              </li>
              <li>
                <a href="https://nvsp.in" target="_blank" rel="noopener noreferrer">
                  {t.govLinks.nvsp}
                </a>
              </li>
              <li>
                <a href="https://www.mygov.in" target="_blank" rel="noopener noreferrer">
                  {t.govLinks.mygov}
                </a>
              </li>
              <li>
                <a href="https://digilocker.gov.in" target="_blank" rel="noopener noreferrer">
                  {t.govLinks.digilocker}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>{t.contact}</h3>
            <div className="contact-info">
              <p>📍 {t.address}</p>
              <p>📞 {t.phone}</p>
              <p>📧 {t.email}</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Youth Voter Awareness Portal. {t.rights}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;