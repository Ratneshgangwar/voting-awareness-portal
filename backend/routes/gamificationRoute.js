// backend/routes/gamificationRoute.js
const express = require("express");
const router = express.Router();

// Simple in-memory state (single-user demo ke liye)
// Future me user-id wise DB rakh sakte ho
let progressState = {
  profileCompleted: false,
  registrationCompleted: false,
  eligibilityChecked: false,
  aiQuestionsAsked: 0,
  sharedAwareness: false,
};

// Badge definitions + progress calculation
function computeGamification(state) {
  const defs = [
    {
      id: 1,
      key: "newVoter",
      name: "New Voter",
      color: "#FF6B6B",
      shape: "circle",
      earned: state.profileCompleted || state.registrationCompleted,
    },
    {
      id: 2,
      key: "eligibilityChecked",
      name: "Eligibility Checked",
      color: "#4ECDC4",
      shape: "star",
      earned: state.eligibilityChecked,
    },
    {
      id: 3,
      key: "voterEducator",
      name: "Voter Educator",
      color: "#45B7D1",
      shape: "hexagon",
      earned: state.sharedAwareness,
    },
    {
      id: 4,
      key: "communityLeader",
      name: "Community Leader",
      color: "#FFA07A",
      shape: "square",
      earned: state.sharedAwareness && state.aiQuestionsAsked >= 3,
    },
    {
      id: 5,
      key: "registrationChampion",
      name: "Registration Champion",
      color: "#98D8C8",
      shape: "diamond",
      earned: state.registrationCompleted,
    },
    {
      id: 6,
      key: "informedCitizen",
      name: "Informed Citizen",
      color: "#F7DC6F",
      shape: "circle",
      earned: state.aiQuestionsAsked >= 3,
    },
  ];

  const badges = defs;
  const earnedCount = badges.filter((b) => b.earned).length;
  const total = badges.length || 1;
  const progress = Math.round((earnedCount / total) * 100);

  return { badges, progress, state };
}

// GET /api/gamification/progress
router.get("/progress", (req, res) => {
  const data = computeGamification(progressState);
  return res.json(data);
});

// POST /api/gamification/update  { event: "..." }
router.post("/update", (req, res) => {
  const { event } = req.body;
  console.log("🎮 Gamification update event:", event);

  switch (event) {
    case "profile_completed":
      progressState.profileCompleted = true;
      break;
    case "registration_completed":
      progressState.registrationCompleted = true;
      break;
    case "eligibility_checked":
      progressState.eligibilityChecked = true;
      break;
    case "ai_question_asked":
      progressState.aiQuestionsAsked += 1;
      break;
    case "awareness_shared":
      progressState.sharedAwareness = true;
      break;
    default:
      console.warn("Unknown gamification event:", event);
  }

  const data = computeGamification(progressState);
  return res.json(data);
});

module.exports = router;
