const express = require("express");
const {
  getSlides,
  createSlide,
  updateSlide,
  deleteSlide,
} = require("../../controllers/AdminHomeControllers/carouselController");
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const { upload } = require("../../config/cloudinaryConfig");
const router = express.Router();

// Public Route (Read): யாருக்கும் அனுமதி உண்டு
router.get("/", getSlides);

// ------------------------------------------------------------------
// 🔐 Admin Routes (AdminAuthProtect சேர்க்கப்பட்டுள்ளது)
// ------------------------------------------------------------------

// CREATE
router.post(
  "/createSlides",
  AdminAuthProtect,
  upload.single("image"),
  createSlide
);

// UPDATE
router.put(
  "/updateSlide/:id",
  AdminAuthProtect,
  upload.single("image"),
  updateSlide
);

router.delete("/deleteSlide/:id", AdminAuthProtect, deleteSlide);

module.exports = router;
