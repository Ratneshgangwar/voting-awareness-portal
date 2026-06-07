// src/components/CountdownTimer.js
import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [electionInfo, setElectionInfo] = useState(null);
  const [targetDate, setTargetDate] = useState(null); // real countdown target
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1️⃣ Backend se upcoming election info lo (Groq se powered)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/elections/upcoming?state=Uttar%20Pradesh&type=assembly"
        );
        const data = await res.json();
        console.log("🗳️ Election info from backend:", data);
        setElectionInfo(data);

        // target date decide karo:
        // 1) Agar electionDate hai -> use it
        // 2) Agar nahi, lekin electionYear hai -> approximate, e.g. 1 March us year
        let target;

        if (data.electionDate) {
          target = new Date(data.electionDate);
        } else if (data.electionYear) {
          // approx: 1 March of that year at 8 AM IST
          target = new Date(`${data.electionYear}-03-01T08:00:00+05:30`);
        } else {
          // last fallback: 2 saal baad approx
          const now = new Date();
          target = new Date(now.getFullYear() + 2, 2, 1, 8, 0, 0); // March 1
        }

        setTargetDate(target);
        setTimeLeft(calculateTimeLeft(target));
      } catch (err) {
        console.error("❌ Failed to load election info:", err);
        setError("Unable to fetch latest election info. Showing approximate countdown.");
        // Rough fallback: 2 years from now
        const now = new Date();
        const fallbackTarget = new Date(now.getFullYear() + 2, 2, 1, 8, 0, 0);
        setTargetDate(fallbackTarget);
        setTimeLeft(calculateTimeLeft(fallbackTarget));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2️⃣ Jab targetDate set ho jaye, har second countdown update karo
  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Helper: diff se timeLeft nikalna
  const calculateTimeLeft = (date) => {
    const now = new Date().getTime();
    const target = date.getTime();
    let diff = target - now;

    if (diff < 0) {
      // election in past -> 5 saal baad approx
      const next = new Date(date);
      next.setFullYear(next.getFullYear() + 5);
      diff = next.getTime() - now;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (diff % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const formatDate = (dateStringOrDate) => {
    const d =
      typeof dateStringOrDate === "string"
        ? new Date(dateStringOrDate)
        : dateStringOrDate;
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="countdown-timer loading">
        <div className="loading-spinner"></div>
        <p>Loading upcoming election details...</p>
      </div>
    );
  }

  const info = electionInfo;

  return (
    <div className="countdown-timer">
      {info && (
        <div className="election-info">
          <h3>🗳️ {info.electionName || "Upcoming Election"}</h3>

          {targetDate && (
            <p className="election-date">
              <strong>Target Polling Window:</strong>{" "}
              {formatDate(targetDate)}
            </p>
          )}

          <p className="election-status">
            <strong>Status:</strong>{" "}
            {info.currentStatus || "Not Announced"}
            {info.electionYear && ` • Expected Year: ${info.electionYear}`}
          </p>

          {info.resultDate && (
            <p className="result-date">
              <strong>Expected Results:</strong>{" "}
              {formatDate(info.resultDate)}
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="election-warning">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* LIVE COUNTDOWN */}
      <div className="countdown-grid">
        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.days}</div>
          <div className="countdown-label">Days</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.hours}</div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.minutes}</div>
          <div className="countdown-label">Minutes</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{timeLeft.seconds}</div>
          <div className="countdown-label">Seconds</div>
        </div>
      </div>

      {/* Optional phases (if Groq ever returns phases) */}
      {info?.phases && info.phases.length > 0 && (
        <div className="phases-info">
          <h4>Election Phases:</h4>
          <div className="phases-list">
            {info.phases.slice(0, 3).map((phase, index) => (
              <div key={index} className="phase-item">
                <strong>{phase.phase}:</strong> {formatDate(phase.date)}
                {phase.states && (
                  <span className="phase-states">
                    {" "}
                    - {phase.states.slice(0, 2).join(", ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="countdown-note">
        <p>
          ⏰ Live countdown towards the next{" "}
          <strong>Uttar Pradesh Assembly Election</strong> (AI-estimated
          window).
        </p>
        <p className="last-updated">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
        <p style={{ fontSize: "11px", opacity: 0.8, marginTop: "6px" }}>
          * Data is generated using AI (Groq) and may not reflect official
          Election Commission announcements. Always verify on ECI website.
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
