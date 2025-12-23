const express = require("express");
const router = express.Router();

// Middlewares
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const { upload } = require("../../config/cloudinaryConfig");
const {
  getActiveWhyChooseItems,
  getAllWhyChooseItems,
  createWhyChooseItem,
  updateWhyChooseItem,
  deleteWhyChooseItem,
} = require("../../controllers/AdminHomeControllers/WhyChooseUsController");

// Controllers

// ------------------------------------------------------------------
// 🎯 Public Routes (Frontend - யாருக்கும் அனுமதி உண்டு)
// ------------------------------------------------------------------

// 1. வெப்சைட்டில் Active-ஆக உள்ள 'Why Choose Us' விவரங்களை மட்டும் காட்ட
router.get("/active-whychoose", getActiveWhyChooseItems);

// ------------------------------------------------------------------
// 🔐 Admin Routes (AdminAuthProtect & Cloudinary Upload)
// ------------------------------------------------------------------

// 2. அனைத்து விவரங்களையும் பெற (Admin Panel-க்காக)
router.get("/all-whychoose", AdminAuthProtect, getAllWhyChooseItems);

// 3. புதிய விவரத்தை உருவாக்க (CREATE)
router.post(
  "/create-whychoose",
  AdminAuthProtect,
  upload.single("image"), // Schema-வில் உள்ளபடி 'image' ஃபீல்ட்
  createWhyChooseItem
);

// 4. விவரங்களைப் புதுப்பிக்க (UPDATE)
router.put(
  "/update-whychoose/:id",
  AdminAuthProtect,
  upload.single("image"), // மாற்ற விரும்பினால் புதிய படம் அப்லோட் செய்யலாம்
  updateWhyChooseItem
);

// 5. விவரத்தை நீக்க (DELETE)
router.delete("/delete-whychoose/:id", AdminAuthProtect, deleteWhyChooseItem);

module.exports = router;
