const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getMeAdmin,
} = require("../controllers/adminAuthController");
const { AdminAuthProtect } = require("../middlewares/adminAuthMiddleware");
const router = express.Router();

// 1. Admin பதிவு
router.post("/register", registerAdmin);

// 2. Admin உள்நுழைவு
router.post("/login", loginAdmin);

// 3. Admin வெளியேறுதல்
router.post("/logout", logoutAdmin);

// 4. தற்போதைய Admin விவரங்கள் (பாதுகாக்கப்பட்ட Route)
router.get("/me", AdminAuthProtect, getMeAdmin);

module.exports = router;
