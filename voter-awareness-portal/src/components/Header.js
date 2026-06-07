// src/components/Header.js (Updated)
import React from 'react';
import LanguageToggle from './LanguageToggle';

const Header = ({ currentPage, setCurrentPage, user, onLogout, language, toggleLanguage, stats }) => {
  const translations = {
    hindi: {
      home: "मुखपृष्ठ",
      login: "लॉगिन",
      signup: "साइन अप",
      dashboard: "डैशबोर्ड",
      faq: "सामान्य प्रश्न",
      contact: "संपर्क करें",
      logout: "लॉग आउट",
      users: "उपयोगकर्ता"
    },
    english: {
      home: "Home",
      login: "Login",
      signup: "Sign Up",
      dashboard: "Dashboard",
      faq: "FAQ",
      contact: "Contact Us",
      logout: "Logout",
      users: "Users"
    }
  };

  const t = translations[language];

  return (
    <header className="header">
      <div className="container">
        <div className="logo-section">
          <h1>मतदाता जागरूकता</h1>
          <p>Voter Awareness Portal</p>
        </div>
        
        <div className="stats-counter">
          <div className="counter">
            <span className="count">{stats.totalUsers}</span>
            <span className="label">{t.users}</span>
          </div>
        </div>

        <nav className="nav">
          <ul>
            <li>
              <button 
                className={currentPage === 'landing' ? 'active' : ''}
                onClick={() => setCurrentPage('landing')}
              >
                {t.home}
              </button>
            </li>
            {!user ? (
              <>
                <li>
                  <button 
                    className={currentPage === 'login' ? 'active' : ''}
                    onClick={() => setCurrentPage('login')}
                  >
                    {t.login}
                  </button>
                </li>
                <li>
                  <button 
                    className={currentPage === 'signup' ? 'active' : ''}
                    onClick={() => setCurrentPage('signup')}
                  >
                    {t.signup}
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button 
                  className={currentPage === 'dashboard' ? 'active' : ''}
                  onClick={() => setCurrentPage('dashboard')}
                >
                  {t.dashboard}
                </button>
              </li>
            )}
            <li>
              <button 
                className={currentPage === 'faq' ? 'active' : ''}
                onClick={() => setCurrentPage('faq')}
              >
                {t.faq}
              </button>
            </li>
            <li>
              <button 
                className={currentPage === 'contact' ? 'active' : ''}
                onClick={() => setCurrentPage('contact')}
              >
                {t.contact}
              </button>
            </li>
            {user && (
              <li>
                <button onClick={onLogout}>
                  {t.logout}
                </button>
              </li>
            )}
          </ul>
        </nav>

        <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
      </div>
    </header>
  );
};

export default Header;