// backend/routes/electionRoute.js
const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk/index.mjs");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Helper: safe JSON parse
function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

// GET /api/elections/upcoming?state=Uttar%20Pradesh&type=assembly
router.get("/upcoming", async (req, res) => {
  const state = req.query.state || "Uttar Pradesh";
  const type = req.query.type || "assembly";

  try {
    console.log("➡️ /api/elections/upcoming hit:", { state, type });

    const prompt = `
You are an assistant that gives structured info about Indian elections.

Task:
- Focus on the next important election for the state: "${state}"
- Election type: "${type}" (e.g. assembly, Lok Sabha, etc.)
- If official dates are NOT yet announced, set "currentStatus" = "Not Announced"
- If only year or approximate month is known, fill "electionYear" and "approximateWindow"
- DO NOT hallucinate exact dates if they are not clearly known.

Respond ONLY in valid JSON in this exact shape:

{
  "electionName": "Uttar Pradesh Assembly Elections 2027",
  "electionDate": null,
  "phases": [],
  "currentStatus": "Not Announced",
  "resultDate": null,
  "totalPhases": null,
  "keyStates": ["Uttar Pradesh"],
  "electionYear": 2027,
  "approximateWindow": "Early 2027"
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You only output strict JSON, no explanations." },
        { role: "user", content: prompt },
      ],
      temperature: 0,
      max_tokens: 512,
    });

    const raw = completion.choices?.[0]?.message?.content || "{}";
    console.log("🔍 Groq raw election JSON:", raw);

    const data = safeJsonParse(raw);

    if (!data || typeof data !== "object") {
      throw new Error("Invalid JSON from Groq");
    }

    // Fallback sanity defaults if fields missing
    const responseData = {
      electionName: data.electionName || `${state} ${type} elections`,
      electionDate: data.electionDate || null,
      phases: Array.isArray(data.phases) ? data.phases : [],
      currentStatus: data.currentStatus || "Unknown",
      resultDate: data.resultDate || null,
      totalPhases: data.totalPhases ?? null,
      keyStates: Array.isArray(data.keyStates) ? data.keyStates : [state],
      electionYear: data.electionYear || null,
      approximateWindow: data.approximateWindow || null,
    };

    return res.json(responseData);
  } catch (err) {
    console.error("❌ Groq election error:", err);

    // Hard fallback: just say "UP Assembly, year approx"
    return res.json({
      electionName: "Uttar Pradesh Assembly Elections",
      electionDate: null,
      phases: [],
      currentStatus: "Not Announced",
      resultDate: null,
      totalPhases: null,
      keyStates: ["Uttar Pradesh"],
      electionYear: 2027,
      approximateWindow: "Expected around early 2027",
    });
  }
});

module.exports = router;
