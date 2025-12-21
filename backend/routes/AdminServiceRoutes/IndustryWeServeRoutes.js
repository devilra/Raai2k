const express = require("express");
const router = express.Router();

// Middlewares
const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const {
  getActiveIndustriesWeServe,
  createIndustriesWeServe,
  getAllIndustriesWeServe,
  getIndustryById,
  updateIndustriesWeServe,
  deleteIndustriesWeServe,
} = require("../../controllers/AdminServiceControllers/IndustriesWeServe");

// Controllers

// -----------------------------------------------------------
// A. PUBLIC ROUTES (Frontend - Active Content மட்டும்)
// -----------------------------------------------------------

// வெப்சைட்டில் காட்டப்பட வேண்டிய Active தகவல்களைப் பெற (No Auth Needed)
router.get("/industries-active", getActiveIndustriesWeServe);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations - பாதுகாக்கப்பட்டவை)
// -----------------------------------------------------------

// 1. புதிய "Industry" ஐட்டத்தை உருவாக்க
router.post("/industries-create", AdminAuthProtect, createIndustriesWeServe);

// 2. அட்மின் பேனலில் பட்டியலிட அனைத்து தகவல்களையும் பெற
router.get("/industries-all", AdminAuthProtect, getAllIndustriesWeServe);

// 3. குறிப்பிட்ட ஒரு தகவலை மட்டும் பெற (Edit செய்யும்போது தேவைப்படும்)
router.get("/industries-content/:id", AdminAuthProtect, getIndustryById);

// 4. தகவல்களைப் புதுப்பிக்க (Update)
router.put(
  "/industries-content/:id",
  AdminAuthProtect,
  updateIndustriesWeServe
);

// 5. தகவலை நீக்க (Delete)
router.delete(
  "/industries-content/:id",
  AdminAuthProtect,
  deleteIndustriesWeServe
);

module.exports = router;
