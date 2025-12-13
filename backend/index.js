const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const sequelize = require("./config/db");
const adminAuthRoutes = require("./routes/adminAuthRoute");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://raai2k.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // Cookie parser-க்கு

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

// Simple root route for testing
app.get("/", (req, res) => {
  res.send("Nodemailer Express Backend is running.");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Connected ${PORT}`);
});
