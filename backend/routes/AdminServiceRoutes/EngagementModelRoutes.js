const express = require("express");
const router = express.Router();

// Middlewares
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const {
  getActiveEngagementModels,
  createEngagementModel,
  getAllEngagementModels,
  getEngagementModelById,
  updateEngagementModel,
  deleteEngagementModel,
} = require("../../controllers/AdminServiceControllers/EngagementController");

// Controllers

// -----------------------------------------------------------
// A. PUBLIC ROUTES (Frontend - Active Content மட்டும்)
// -----------------------------------------------------------

// வெப்சைட்டில் காட்டப்பட வேண்டிய Active Engagement மாடல்களைப் பெற
router.get("/engagement-active", getActiveEngagementModels);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations - பாதுகாக்கப்பட்டவை)
// -----------------------------------------------------------

// 1. புதிய Engagement Model-ஐ உருவாக்குதல்
router.post("/engagement-create", AdminAuthProtect, createEngagementModel);

// 2. அட்மின் பேனலில் பட்டியலிட அனைத்து தகவல்களையும் பெறுதல்
router.get("/engagement-all", AdminAuthProtect, getAllEngagementModels);

// 3. குறிப்பிட்ட ஒரு தகவலை மட்டும் பெற (Edit செய்யும்போது தேவைப்படும்)
router.get("/engagement-content/:id", AdminAuthProtect, getEngagementModelById);

// 4. தகவல்களைப் புதுப்பித்தல் (Update)
router.put("/engagement-content/:id", AdminAuthProtect, updateEngagementModel);

// 5. தகவலை நீக்குதல் (Delete)
router.delete(
  "/engagement-content/:id",
  AdminAuthProtect,
  deleteEngagementModel
);

module.exports = router;
