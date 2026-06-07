// src/components/LanguageToggle.js
import React from 'react';

const LanguageToggle = ({ language, toggleLanguage }) => {
  return (
    <div className="language-toggle">
      <button 
        className={`lang-btn ${language === 'hindi' ? 'active' : ''}`}
        onClick={() => toggleLanguage()}
      >
        हिन्दी
      </button>
      <button 
        className={`lang-btn ${language === 'english' ? 'active' : ''}`}
        onClick={() => toggleLanguage()}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;