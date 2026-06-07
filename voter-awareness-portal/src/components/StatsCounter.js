// src/components/StatsCounter.js (Updated)
import React from 'react';

const StatsCounter = ({ language, stats }) => {
  const translations = {
    hindi: {
      usersReached: "युवाओं तक पहुंचे",
      eligibleVoters: "पात्र मतदाता",
      registrations: "पंजीकरण",
      awarenessCreated: "जागरूकता फैलाई"
    },
    english: {
      usersReached: "Youth Reached",
      eligibleVoters: "Eligible Voters",
      registrations: "Registrations",
      awarenessCreated: "Awareness Created"
    }
  };

  const t = translations[language];

  return (
    <div className="stats-counter">
      <div className="stat-item">
        <div className="stat-value">{stats.totalUsers}+</div>
        <div className="stat-label">{t.usersReached}</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">{stats.eligibleVoters}+</div>
        <div className="stat-label">{t.eligibleVoters}</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">{stats.registrations}+</div>
        <div className="stat-label">{t.registrations}</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">{stats.awarenessCreated}+</div>
        <div className="stat-label">{t.awarenessCreated}</div>
      </div>
    </div>
  );
};

export default StatsCounter;