const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// 1. Cloudinary Credentials-ஐ அமைக்கவும்
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("cloudinary image upload start");

// 2. Cloudinary Storage Engine-ஐ அமைக்கவும்
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "carousel_slides", // Cloudinary-இல் படங்களைச் சேமிக்க வேண்டிய folder பெயர்
    allowed_formats: ["jpg", "png", "jpeg"],
    //transformation: [{ width: 1920, height: 1080, crop: "limit" }],
  },
});

// 3. Multer Middleware-ஐ உருவாக்கவும்
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = {
  cloudinary,
  upload,
};
