const express = require("express");
const router = express.Router();

// Middlewares
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const { upload } = require("../../config/cloudinaryConfig");
const {
  getActiveTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../../controllers/AdminHomeControllers/ClientTestimonial");

// Controllers

// ------------------------------------------------------------------
// 💬 Public Routes (Frontend - யாருக்கும் அனுமதி உண்டு)
// ------------------------------------------------------------------

// 1. வெப்சைட்டில் Active-ஆக உள்ள கருத்துக்களை மட்டும் காட்ட (Public API)
router.get("/active-testimonials", getActiveTestimonials);

// ------------------------------------------------------------------
// 🔐 Admin Routes (AdminAuthProtect & Cloudinary Upload)
// ------------------------------------------------------------------

// 2. அனைத்து கருத்துக்களையும் பெற (Admin Panel-க்காக)
router.get("/all-testimonials", AdminAuthProtect, getAllTestimonials);

// 3. புதிய கருத்தை உருவாக்க (CREATE)
router.post(
  "/create-testimonial",
  AdminAuthProtect,
  upload.single("image"), // 'image' என்பதுதான் உங்கள் Schema-வில் உள்ள ஃபீல்ட் பெயர்
  createTestimonial
);

// 4. கருத்தின் விவரங்களைப் புதுப்பிக்க (UPDATE)
router.put(
  "/update-testimonial/:id",
  AdminAuthProtect,
  upload.single("image"), // விருப்பப்பட்டால் படத்தை மாற்றலாம்
  updateTestimonial
);

// 5. கருத்தை நீக்க (DELETE)
router.delete("/delete-testimonial/:id", AdminAuthProtect, deleteTestimonial);

module.exports = router;
