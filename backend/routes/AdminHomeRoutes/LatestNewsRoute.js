const express = require("express");
const router = express.Router();

// Middlewares
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const { upload } = require("../../config/cloudinaryConfig");
const {
  getActiveNews,
  getAllNews,
  updateNews,
  deleteNews,
  createNews,
} = require("../../controllers/AdminHomeControllers/LatestNews");

// Controllers

// ------------------------------------------------------------------
// 📰 Public Routes (Frontend - யாருக்கும் அனுமதி உண்டு)
// ------------------------------------------------------------------

// 1. வெப்சைட்டில் Active-ஆக உள்ள செய்திகளை மட்டும் காட்ட (Public API)
router.get("/active-news", getActiveNews);

// ------------------------------------------------------------------
// 🔐 Admin Routes (AdminAuthProtect & Cloudinary Upload)
// ------------------------------------------------------------------

// 2. அனைத்து செய்திகளையும் பெற (Admin Panel-க்காக)
router.get("/all-news", AdminAuthProtect, getAllNews);

// 3. புதிய செய்தியை உருவாக்க (CREATE)
router.post(
  "/create-news",
  AdminAuthProtect,
  upload.single("image"), // 'image' என்பதுதான் உங்கள் Schema-வில் உள்ள ஃபீல்ட் பெயர்
  createNews
);

// 4. செய்தியின் விவரங்களைப் புதுப்பிக்க (UPDATE)
router.put(
  "/update-news/:id",
  AdminAuthProtect,
  upload.single("image"), // விருப்பப்பட்டால் படத்தை மாற்றலாம்
  updateNews
);

// 5. செய்தியை நீக்க (DELETE)
router.delete("/delete-news/:id", AdminAuthProtect, deleteNews);

module.exports = router;
