// src/components/Gamification.js
import React, { useState, useEffect } from "react";

const Gamification = ({ language = "english" }) => {
  const [badges, setBadges] = useState([]);
  const [progress, setProgress] = useState(0);

  // --------- Translations ----------
  const translations = {
    hindi: {
      title: "आपकी उपलब्धियां",
      progress: "प्रगति",
      badgesEarned: "बैज अर्जित किए",
      of: "में से",
      badges: {
        newVoter: "नया मतदाता",
        eligibilityChecked: "पात्रता जांच पूरी",
        voterEducator: "मतदाता शिक्षक",
        communityLeader: "समुदाय नेता",
        registrationChampion: "पंजीकरण चैंपियन",
        informedCitizen: "सूचित नागरिक",
      },
    },
    english: {
      title: "Your Achievements",
      progress: "Progress",
      badgesEarned: "Badges Earned",
      of: "of",
      badges: {
        newVoter: "New Voter",
        eligibilityChecked: "Eligibility Checked",
        voterEducator: "Voter Educator",
        communityLeader: "Community Leader",
        registrationChampion: "Registration Champion",
        informedCitizen: "Informed Citizen",
      },
    },
  };

  const t = translations[language] || translations.english;

  // --------- Static demo data (all logic yahi se) ----------
  useEffect(() => {
    // yahan se tum decide kar sakte ho ki kaun sa badge earned hai
    // abhi ke liye: 4 earned, 2 locked (acha realistic progress dikh jayega)
    const userBadges = [
      {
        id: 1,
        key: "newVoter",
        name: "New Voter",
        color: "#FF6B6B",
        shape: "circle",
        earned: true,
      },
      {
        id: 2,
        key: "eligibilityChecked",
        name: "Eligibility Checked",
        color: "#4ECDC4",
        shape: "star",
        earned: true,
      },
      {
        id: 3,
        key: "voterEducator",
        name: "Voter Educator",
        color: "#45B7D1",
        shape: "hexagon",
        earned: true,
      },
      {
        id: 4,
        key: "communityLeader",
        name: "Community Leader",
        color: "#FFA07A",
        shape: "square",
        earned: false,
      },
      {
        id: 5,
        key: "registrationChampion",
        name: "Registration Champion",
        color: "#98D8C8",
        shape: "diamond",
        earned: true,
      },
      {
        id: 6,
        key: "informedCitizen",
        name: "Informed Citizen",
        color: "#F7DC6F",
        shape: "circle",
        earned: false,
      },
    ];

    setBadges(userBadges);

    const earnedCount = userBadges.filter((b) => b.earned).length;
    const total = userBadges.length || 1;
    setProgress(Math.round((earnedCount / total) * 100));
  }, [language]);

  const getBadgeName = (badge) => {
    return t.badges[badge.key] || badge.name;
  };

  return (
    <div className="gamification">
      <h2>{t.title}</h2>

      <div className="progress-section">
        <h3>{t.progress}</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>
          {badges.filter((b) => b.earned).length} {t.of} {badges.length}{" "}
          {t.badgesEarned}
        </p>
      </div>

      <div className="badges-grid">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`badge ${badge.earned ? "earned" : "locked"}`}
            style={{
              backgroundColor: badge.earned ? badge.color : "#CCCCCC",
              borderRadius:
                badge.shape === "circle"
                  ? "50%"
                  : badge.shape === "square"
                  ? "0"
                  : badge.shape === "star"
                  ? "50% 50% 0 0"
                  : "10px",
            }}
          >
            <div className="badge-icon">{badge.earned ? "✓" : "🔒"}</div>
            <div className="badge-name">{getBadgeName(badge)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gamification;
