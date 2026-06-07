// src/components/LandingPage.js (Updated)
import React from 'react';
import CountdownTimer from './CountdownTimer';
import StatsCounter from './StatsCounter';

const LandingPage = ({ setCurrentPage, language, stats }) => {
  const translations = {
    hindi: {
      title: "युवा मतदाता जागरूकता अभियान",
      subtitle: "अपने मतदान अधिकारों को जानें, देश के भविष्य में भाग लें",
      description: "हमारा मिशन है कि हर युवा अपने मतदान अधिकारों से अवगत हो और देश की लोकतांत्रिक प्रक्रिया में सक्रिय भागीदारी करे।",
      features: [
        "मतदान पात्रता जांच",
        "मतदान पंजीकरण मार्गदर्शिका",
        "मतदान का महत्व",
        "अपने उम्मीदवार को जानें",
        "गेमिफिकेशन और बैजेस"
      ],
      cta: "अभी जुड़ें",
      stats: {
        usersReached: "युवाओं तक पहुंचे",
        eligibleVoters: "पात्र मतदाता",
        registrations: "पंजीकरण",
        awarenessCreated: "जागरूकता फैलाई"
      }
    },
    english: {
      title: "Youth Voter Awareness Campaign",
      subtitle: "Know Your Voting Rights, Participate in Nation's Future",
      description: "Our mission is to ensure every youth is aware of their voting rights and actively participates in the country's democratic process.",
      features: [
        "Voting Eligibility Check",
        "Voter Registration Guide",
        "Importance of Voting",
        "Know Your Candidate",
        "Gamification & Badges"
      ],
      cta: "Join Now",
      stats: {
        usersReached: "Youth Reached",
        eligibleVoters: "Eligible Voters",
        registrations: "Registrations",
        awarenessCreated: "Awareness Created"
      }
    }
  };

  const t = translations[language];

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{t.title}</h1>
            <p className="subtitle">{t.subtitle}</p>
            <p className="description">{t.description}</p>
            <button 
              className="cta-button"
              onClick={() => setCurrentPage('signup')}
            >
              {t.cta}
            </button>
          </div>
          
          <div className="countdown-section">
            <h2>Next Election Countdown</h2>
            <CountdownTimer />
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <StatsCounter language={language} stats={stats} />
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Our Features</h2>
          <div className="features-grid">
            {t.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{index + 1}</div>
                <h3>{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="video-section">
        <div className="container">
          <h2>{language === 'hindi' ? "मतदान का महत्व" : "Importance of Voting"}</h2>
          <div className="video-container">
            <iframe 
              width="100%" 
              height="400" 
              src="https://www.youtube.com/embed/9F4KygV2I_c" 
              title="Importance of Voting"
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;