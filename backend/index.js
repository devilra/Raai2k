const express = require("express");
const cors = require("cors");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://raai2k.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    //credentials: true,
  })
);
app.use(express.json());

app.use("/api", contactRoutes);

// Simple root route for testing
app.get("/", (req, res) => {
  res.send("Nodemailer Express Backend is running.");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Connected ${PORT}`);
});
