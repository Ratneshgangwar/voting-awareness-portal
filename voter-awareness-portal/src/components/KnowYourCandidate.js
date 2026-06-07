// src/components/KnowYourCandidate.js
import React, { useState, useEffect, useRef } from "react";

const KnowYourCandidate = ({ language }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const t = {
    hindi: {
      title: "अपने उम्मीदवार को जानें 🤖",
      placeholder:
        "यहाँ टाइप करें जैसे — वाराणसी के लोकसभा उम्मीदवार कौन हैं?",
      send: "भेजें",
      loading: "डेटा लोड हो रहा है...",
      intro:
        "आप यहाँ अपने क्षेत्र के उम्मीदवारों, चुनाव प्रक्रिया और मतदान अधिकार के बारे में पूछ सकते हैं। उदाहरण: 'पहली बार वोट देने वाले को क्या ध्यान रखना चाहिए?'",
      errorNoData: "माफ़ करें, इस समय सही जानकारी नहीं मिल सकी।",
      backendError: "माफ़ करें, सेवा अस्थायी रूप से उपलब्ध नहीं है।",
    },
    english: {
      title: "Know Your Candidate 🤖",
      placeholder:
        "Type here, e.g. What should a first-time voter check before voting?",
      send: "Send",
      loading: "Loading data...",
      intro:
        "Ask about candidates, voting rights, and election process. Example: 'What should first-time voters in India know?'",
      errorNoData: "Sorry, I couldn't get correct information right now.",
      backendError: "Sorry, the service is temporarily unavailable.",
    },
  }[language || "english"];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const question = input.trim();
    const userMessage = { role: "user", text: question };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // 👇 IMPORTANT: Directly call backend on port 5000
      const response = await fetch(
        "http://localhost:5000/api/ai/candidates",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            language: language || "english",
          }),
        }
        
      );

      const result = await response.json();
      console.log("Backend response:", result);

      let replyText;
      if (!response.ok || !result.answer) {
        replyText = t.errorNoData;
      } else {
        replyText = result.answer;
      }

      const aiMessage = {
        role: "assistant",
        text: replyText,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("❌ AI request failed:", error);
      const aiMessage = {
        role: "assistant",
        text: t.backendError,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="ai-chat-container">
      <div className="chat-header">
        <h2>{t.title}</h2>
        <p className="chat-intro">{t.intro}</p>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.role === "user" ? "user-msg" : "ai-msg"
            }`}
          >
            <div className="message-bubble">
              {msg.role === "assistant" && <span className="ai-icon">🤖</span>}
              <p>{msg.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat-message ai-msg">
            <div className="message-bubble loading-bubble">
              <span className="ai-icon">🤖</span>
              <span className="loading-dots">{t.loading}</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          {t.send}
        </button>
      </div>
    </div>
  );
};

export default KnowYourCandidate;
