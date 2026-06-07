// backend/routes/aiCandidatesRoute.js
const express = require("express");
const Groq = require("groq-sdk/index.mjs");

const router = express.Router();

// Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Debug: check env
console.log("🔍 GROQ_API_KEY present?", !!process.env.GROQ_API_KEY);

// POST /api/ai/candidates
router.post("/", async (req, res) => {
  const { question, language = "english" } = req.body;

  console.log("➡️ /api/ai/candidates (Groq) hit with:", { question, language });

  if (!question) {
    return res.status(200).json({
      answer:
        language === "hindi"
          ? "कृपया अपना सवाल लिखें ताकि मैं आपकी मदद कर सकूँ।"
          : "Please type your question so I can help you.",
    });
  }

  if (!process.env.GROQ_API_KEY) {
    console.error("❌ GROQ_API_KEY not set");
    return res.status(200).json({
      answer:
        language === "hindi"
          ? "AI सेवा की सेटिंग पूरी नहीं है, लेकिन आप अपने मतदान अधिकार और उम्मीदवारों की जानकारी भारत निर्वाचन आयोग (ECI) और राज्य के CEO की आधिकारिक वेबसाइट से देख सकते हैं।"
          : "The AI service is not fully configured, but you can check your voting rights and candidate information on the official Election Commission and State CEO websites.",
    });
  }

  const systemPrompt =
    language === "hindi"
      ? `आप भारत के लिए एक निष्पक्ष नागरिक सूचना सहायक हैं।
आपका काम:
- मतदान अधिकार, चुनाव प्रक्रिया और उम्मीदवारों के बारे में जागरूकता बढ़ाना है।
- किसी भी राजनीतिक पार्टी या उम्मीदवार का प्रचार या विरोध नहीं करना है।
- अगर किसी विशेष क्षेत्र के उम्मीदवारों की सटीक या ताज़ा जानकारी उपलब्ध न हो, तो ईमानदारी से बताना है और भारत निर्वाचन आयोग (ECI) या राज्य के CEO की आधिकारिक वेबसाइट देखने की सलाह देनी है।
- खासकर युवाओं और पहली बार वोट देने वालों के लिए जानकारी को सरल भाषा में समझाना है।`
      : `You are a neutral civic information assistant for India.
Your job:
- Explain voting rights, election process, and candidate-related topics in a clear and educational way.
- Never promote or oppose any political party or candidate.
- If you don't have exact or up-to-date candidate lists for a user's area, clearly say so and recommend the official Election Commission of India (ECI) or State CEO websites.
- Focus especially on awareness for youth and first-time voters, using simple language.`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
// fast & good enough for Q&A
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    const answer = completion.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      console.error("❌ Groq returned empty answer");
      return res.status(200).json({
        answer:
          language === "hindi"
            ? "अभी सही जवाब नहीं मिल सका। आप अपने क्षेत्र और उम्मीदवारों की जानकारी चुनाव आयोग की आधिकारिक वेबसाइट से भी देख सकते हैं।"
            : "I couldn't generate a proper answer right now. You can also check your area and candidate information on the official Election Commission websites.",
      });
    }

    return res.json({ answer });
  } catch (err) {
    console.error("❌ Groq AI error:", err);
    return res.status(200).json({
      answer:
        language === "hindi"
          ? "फिलहाल AI सेवा में तकनीकी समस्या है, लेकिन आप अपने मतदान अधिकार, वोटर लिस्ट और उम्मीदवारों की जानकारी भारत निर्वाचन आयोग (ECI) और राज्य के CEO की आधिकारिक वेबसाइट से देख सकते हैं।"
          : "There is a temporary issue with the AI service, but you can check your voting rights, voter list, and candidate information on the official Election Commission of India and State CEO websites.",
    });
  }
});

module.exports = router;
