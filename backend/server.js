// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const aiCandidatesRoute = require("./routes/aiCandidatesRoute");
const gamificationRoute = require("./routes/gamificationRoute");
const electionRoute = require("./routes/electionRoute"); // 👈 NEW

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("VotingRights backend API is running ✅");
});

// ------- API ROUTES --------
app.use("/api/ai/candidates", aiCandidatesRoute);      // ✔ Groq AI (KnowYourCandidate)
app.use("/api/gamification", gamificationRoute);       // ✔ Badges backend tracking
app.use("/api/elections", electionRoute);              // ✔ Groq-based upcoming elections API

// ----------------------------
const PORT = process.env.PORT || 5000;

// Server start
app.listen(PORT, () => {
  console.log(`\n======================================`);
  console.log(`  ✅ Backend running on port ${PORT}`);
  console.log(`  🌐 API available at: http://localhost:${PORT}`);
  console.log(`======================================\n`);
});
