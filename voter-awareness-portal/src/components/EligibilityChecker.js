// src/components/EligibilityChecker.js
import React, { useState } from 'react';

const EligibilityChecker = ({ user, language }) => {
  const [isEligible, setIsEligible] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const checkEligibility = () => {
    // Simple eligibility check based on age (18+)
    const age = calculateAge(user.dob);
    const eligible = age >= 18;
    setIsEligible(eligible);
    setShowDetails(true);
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

  const translations = {
    hindi: {
      title: "मतदान पात्रता जांच",
      checkButton: "अपनी पात्रता जांचें",
      eligible: "बधाई हो! आप मतदान के लिए पात्र हैं।",
      notEligible: "आप अभी मतदान के लिए पात्र नहीं हैं।",
      ageMessage: "आपकी आयु {age} वर्ष है।",
      nextSteps: "अगले कदम",
      register: "मतदाता पंजीकरण के लिए आवेदन करें",
      guide: "चरण-दर-चरण मार्गदर्शिका",
      resources: "संसाधन",
      links: {
        nvsp: "राष्ट्रीय मतदाता सेवा पोर्टल",
        guide: "मतदाता पंजीकरण गाइड",
        video: "मतदान का महत्व वीडियो"
      }
    },
    english: {
      title: "Voting Eligibility Check",
      checkButton: "Check Your Eligibility",
      eligible: "Congratulations! You are eligible to vote.",
      notEligible: "You are not currently eligible to vote.",
      ageMessage: "Your age is {age} years.",
      nextSteps: "Next Steps",
      register: "Apply for Voter Registration",
      guide: "Step-by-Step Guide",
      resources: "Resources",
      links: {
        nvsp: "National Voter Service Portal",
        guide: "Voter Registration Guide",
        video: "Importance of Voting Video"
      }
    }
  };

  const t = translations[language];
  const age = calculateAge(user.dob);

  return (
    <div className="eligibility-checker">
      <h2>{t.title}</h2>
      
      <div className="user-info">
        <p><strong>{language === 'hindi' ? "नाम" : "Name"}:</strong> {user.username}</p>
        <p><strong>{language === 'hindi' ? "जन्म तिथि" : "Date of Birth"}:</strong> {user.dob}</p>
        <p><strong>{language === 'hindi' ? "आयु" : "Age"}:</strong> {age} {language === 'hindi' ? "वर्ष" : "years"}</p>
      </div>

      <button className="check-button" onClick={checkEligibility}>
        {t.checkButton}
      </button>

      {showDetails && (
        <div className={`result ${isEligible ? 'eligible' : 'not-eligible'}`}>
          <h3>{isEligible ? t.eligible : t.notEligible}</h3>
          <p>{t.ageMessage.replace('{age}', age)}</p>

          {isEligible && (
            <div className="next-steps">
              <h4>{t.nextSteps}</h4>
              <div className="steps">
                <div className="step">
                  <h5>{t.register}</h5>
                  <a href="https://www.nvsp.in" target="_blank" rel="noopener noreferrer">
                    {t.links.nvsp}
                  </a>
                </div>
                <div className="step">
                  <h5>{t.guide}</h5>
                  <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">
                    {t.links.guide}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="resources">
            <h4>{t.resources}</h4>
            <div className="resource-links">
              <a href="https://www.youtube.com/results?search_query=importance+of+voting" target="_blank" rel="noopener noreferrer">
                {t.links.video}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityChecker;