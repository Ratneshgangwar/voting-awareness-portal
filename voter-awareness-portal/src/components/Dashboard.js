// src/components/Dashboard.js
import React, { useState } from 'react';
import EligibilityChecker from './EligibilityChecker';
import Gamification from './Gamification';
import KnowYourCandidate from './KnowYourCandidate';

const Dashboard = ({ user, language, usersCount }) => {
  const [activeTab, setActiveTab] = useState('eligibility');

  const translations = {
    hindi: {
      welcome: "स्वागत है",
      dashboard: "आपका डैशबोर्ड",
      tabs: {
        eligibility: "पात्रता जांच",
        gamification: "बैज और प्रगति",
        candidate: "उम्मीदवार जानें"
      }
    },
    english: {
      welcome: "Welcome",
      dashboard: "Your Dashboard",
      tabs: {
        eligibility: "Eligibility Check",
        gamification: "Badges & Progress",
        candidate: "Know Your Candidate"
      }
    }
  };

  const t = translations[language];

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>{t.welcome}, {user.username}!</h1>
          <p>{t.dashboard}</p>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={activeTab === 'eligibility' ? 'active' : ''}
            onClick={() => setActiveTab('eligibility')}
          >
            {t.tabs.eligibility}
          </button>
          <button 
            className={activeTab === 'gamification' ? 'active' : ''}
            onClick={() => setActiveTab('gamification')}
          >
            {t.tabs.gamification}
          </button>
          <button 
            className={activeTab === 'candidate' ? 'active' : ''}
            onClick={() => setActiveTab('candidate')}
          >
            {t.tabs.candidate}
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'eligibility' && (
            <EligibilityChecker user={user} language={language} />
          )}
          {activeTab === 'gamification' && (
            <Gamification user={user} language={language} />
          )}
          {activeTab === 'candidate' && (
            <KnowYourCandidate language={language} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;