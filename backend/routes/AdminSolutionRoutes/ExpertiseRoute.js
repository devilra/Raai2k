const express = require("express");

const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const { upload } = require("../../config/cloudinaryConfig");
const {
  getExpertise,
  createExpertise,
  updateExpertise,
  deleteExpertise,
} = require("../../controllers/AdminSolutionControllers/Expertise");
const router = express.Router();

// Public Route (Read): யாருக்கும் அனுமதி உண்டு
router.get("/expertise", getExpertise);

// ------------------------------------------------------------------
// 🔐 Admin Routes (AdminAuthProtect சேர்க்கப்பட்டுள்ளது)
// ------------------------------------------------------------------

// CREATE
router.post(
  "/create-expertise",
  AdminAuthProtect,
  upload.single("image"),
  createExpertise
);

// UPDATE
router.put(
  "/update-expertise/:id",
  AdminAuthProtect,
  upload.single("image"),
  updateExpertise
);

router.delete("/delete-expertise/:id", AdminAuthProtect, deleteExpertise);

module.exports = router;
