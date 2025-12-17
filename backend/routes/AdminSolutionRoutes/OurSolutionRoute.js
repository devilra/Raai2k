const express = require("express");

const { AdminAuthProtect } = require("../../middlewares/adminAuthMiddleware");
const {
  getOurSolution,
  createOurSolution,
  getAllOurSolution,
  getOurSolutionById,
  updateOurSolution,
  deleteOurSolution,
} = require("../../controllers/AdminSolutionControllers/OurSolution");
const router = express.Router();

// Active Welcome Content-ஐ Front-end-க்கு வழங்குகிறது
router.get("/oursolution-active", getOurSolution);

// -----------------------------------------------------------
// B. ADMIN ROUTES (CRUD Operations)
// -----------------------------------------------------------

// புதிய Welcome Content-ஐ உருவாக்குதல்
router.post("/oursolution-create", AdminAuthProtect, createOurSolution);

// Admin Listing-க்காக அனைத்து Welcome Content-களையும் பெறுதல்
router.get("/oursolution-all", AdminAuthProtect, getAllOurSolution);

// ID மூலம் ஒரு Welcome Content-ஐப் பெறுதல் (Edit Form-க்கு)
router.get("/oursolution-single/:id", AdminAuthProtect, getOurSolutionById);

// Welcome Content-ஐப் புதுப்பித்தல்
router.put("/oursolution-update/:id", AdminAuthProtect, updateOurSolution);

// Welcome Content-ஐ நீக்குதல்
router.delete("/oursolution-delete/:id", AdminAuthProtect, deleteOurSolution);

module.exports = router;
