const express = require("express");
const router = express.Router();

// Middlewares
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const { upload } = require("../../config/cloudinaryConfig");
const {
  getActiveGlobalLeaders,
  getGlobalLeaders,
  createGlobalLeader,
  updateGlobalLeader,
  deleteGlobalLeader,
} = require("../../controllers/AdminAboutControllers/GlobalLeadership");

// Controllers

// ------------------------------------------------------------------
// 🌐 Public Routes (Frontend - யாருக்கும் அனுமதி உண்டு)
// ------------------------------------------------------------------

// 1. வெப்சைட்டில் Active-ஆக உள்ள தலைவர்களை மட்டும் காட்ட (Public API)
router.get("/active-leaders", getActiveGlobalLeaders);

// ------------------------------------------------------------------
// 🔐 Admin Routes (AdminAuthProtect & Cloudinary Upload)
// ------------------------------------------------------------------

// 2. அனைத்து தலைவர்களையும் பெற (Active & Inactive - Admin Panel-க்காக)
router.get("/all-leaders", AdminAuthProtect, getGlobalLeaders);

// 3. புதிய தலைவரை உருவாக்க (CREATE)
router.post(
  "/create-leader",
  AdminAuthProtect,
  upload.single("image"), // ஒரே ஒரு படம் மட்டும் பதிவேற்ற
  createGlobalLeader
);

// 4. தலைவரின் விவரங்களைப் புதுப்பிக்க (UPDATE)
router.put(
  "/update-leader/:id",
  AdminAuthProtect,
  upload.single("image"), // விருப்பப்பட்டால் படத்தை மாற்றலாம்
  updateGlobalLeader
);

// 5. தலைவரை நீக்க (DELETE)
router.delete("/delete-leader/:id", AdminAuthProtect, deleteGlobalLeader);

module.exports = router;
