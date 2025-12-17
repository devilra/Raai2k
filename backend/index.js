const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const sequelize = require("./config/db");
const adminAuthRoutes = require("./routes/adminAuthRoute");
const adminHomeRoutes = require("./routes/AdminHomeRoutes/carouselRoutes");
const adminWelcomeRoutes = require("./routes/AdminHomeRoutes/WelcomeContentRoute");
const adminSolutionRoutes = require("./routes/AdminSolutionRoutes/SolutionBannerRoute");
const adminOurSolutionRoutes = require("./routes/AdminSolutionRoutes/OurSolutionRoute");
const adminOurProcessRoutes = require("./routes/AdminSolutionRoutes/OurProcessRoute");
const adminExpertiseRoutes = require("./routes/AdminSolutionRoutes/ExpertiseRoute");
const adminAboutBannerRoutes = require("./routes/AdminAboutRoutes/AboutBannerRoutes");
const adminAboutCeoRoutes = require("./routes/AdminAboutRoutes/AboutCeoRoutes");
const adminAboutCompanyOverview = require("./routes/AdminAboutRoutes/companyOverviewRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://raai2k.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Cookie parser-க்கு

//Immediate call function

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully!");
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced successfully!");
  } catch (error) {
    console.error("❌ DB Errors:", error);
  }
})();

app.use("/api", contactRoutes);
app.use("/api/admin", adminAuthRoutes);

// Not updated cpanel Routes
app.use("/api/admin", adminHomeRoutes);
app.use("/api/admin", adminWelcomeRoutes);
app.use("/api/admin", adminSolutionRoutes);
app.use("/api/admin", adminOurSolutionRoutes);
app.use("/api/admin", adminOurProcessRoutes);
app.use("/api/admin", adminExpertiseRoutes);
app.use("/api/admin", adminAboutBannerRoutes);
app.use("/api/admin", adminAboutCeoRoutes);
app.use("/api/admin/about", adminAboutCompanyOverview);

// Simple root route for testing
app.get("/", (req, res) => {
  res.send("Nodemailer Express Backend is running.");
});

// ===================================
// 🚨 ERROR HANDLING MIDDLEWARES (இதைச் சேர்ப்பதன் மூலம் [object Object] பிழை நீங்கும்)
// ===================================

// 1. 404 Route Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// 2. 💡 General Error Handler (இதில் Multer பிழைகளும் கையாளப்படும்)
app.use((err, req, res, next) => {
  // Status Code: 500 (Internal Server Error) அல்லது ஏற்கனவே அமைக்கப்பட்ட Status Code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Response-ஐ JSON Format-இல் அனுப்பவும் (இது [object Object] வருவதைத் தடுக்கும்)
  res.json({
    message: err.message,
    // Development mode-இல் Stack Trace-ஐக் காட்டலாம்
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Connected ${PORT}`);
});
