const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const { cloudinary } = require("../../config/cloudinaryConfig");

const SolutionBanner = sequelize.define(
  "SolutionBanner",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // 🔹 தலைப்பு: "Solutions"
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    // 🔹 விளக்கம்: "End-to-end fintech and technology solutions designed for speed..."
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // 🔹 பட URL (பின்புலப் படம்)
    image: {
      type: DataTypes.STRING,
      allowNull: true, // பேனருக்கு படம் கட்டாயமில்லை என்றால் true, இல்லையெனில் false
    },
    // 💡 Cloudinary Public ID
    publicId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 🔹 எழுத்துருவின் நிலை (படத்தில் பெரிய Text இருப்பதால் இது தேவைப்படலாம்)
    // hero: மிகைப்படுத்தப்பட்ட தலைப்பு
    fontVariant: {
      type: DataTypes.ENUM("normal", "highlight", "hero"),
      allowNull: false,
      defaultValue: "hero",
    },
    // 🔹 செயற்பாடு / செயற்பாடின்மை (Active / Inactive)
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "solution_banners", // Database-இல் உள்ள அட்டவணைப் பெயர்
    timestamps: true,

    // 💡 Hooks (Image Management) - Carousel-இல் பயன்படுத்திய அதே லாஜிக்
    hooks: {
      // Delete hook: ஒரு row நீக்கப்படும் முன் Cloudinary-ஐ நீக்க
      beforeDestroy: async (banner, options) => {
        if (banner.publicId) {
          await cloudinary.uploader.destroy(banner.publicId);
          console.log(
            `Cloudinary image deleted successfully: ${banner.publicId}`
          );
        }
      },
      // Update hook: image மாறினால், பழைய படத்தை நீக்க
      beforeUpdate: async (banner, options) => {
        if (banner.changed("image") || banner.changed("publicId")) {
          const oldImagePublicId = banner.previous("publicId");
          if (oldImagePublicId) {
            await cloudinary.uploader.destroy(oldImagePublicId);
            console.log(
              `Old Cloudinary image deleted successfully during update: ${oldImagePublicId}`
            );
          }
        }
      },
    },
  }
);

module.exports = SolutionBanner;
