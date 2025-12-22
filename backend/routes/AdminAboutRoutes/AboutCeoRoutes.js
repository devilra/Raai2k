const express = require("express");

const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const { upload } = require("../../config/cloudinaryConfig");
const {
  getCeoMessages,
  createCeoMessage,
  updateCeoMessage,
  deleteCeoMessage,
  getActiveCeoMessages,
} = require("../../controllers/AdminAboutControllers/AboutCeoController");
const router = express.Router();

// Public Route (Read): யாருக்கும் அனுமதி உண்டு
router.get("/about-ceo", getCeoMessages);

router.get("/active-ceo", getActiveCeoMessages);

// ------------------------------------------------------------------
// 🔐 Admin Routes (AdminAuthProtect சேர்க்கப்பட்டுள்ளது)
// ------------------------------------------------------------------

// CREATE
router.post(
  "/create-ceo",
  AdminAuthProtect,
  upload.single("image"),
  createCeoMessage
);

// UPDATE
router.put(
  "/update-ceo/:id",
  AdminAuthProtect,
  upload.single("image"),
  updateCeoMessage
);

router.delete("/delete-ceo/:id", AdminAuthProtect, deleteCeoMessage);

module.exports = router;
