const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const { cloudinary } = require("../../config/cloudinaryConfig");

const CarouselSlide = sequelize.define(
  "CarouselSlide",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // தானாகவே அதிகரிக்கும் (Auto Increment)
      primaryKey: true, // முதன்மைச் சாவி (Primary Key)
    },

    // 🔹 ஸ்லைடு தலைப்பு (Slide Title)
    title: {
      type: DataTypes.STRING(250),
      allowNull: false, // இந்த புலம் காலியாக இருக்கக் கூடாது (Cannot be null)
    },
    // 🔹 ஸ்லைடு விளக்கம் (Slide Description)
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // 🔹 பட URL (Cloudinary / S3 / Local Storage Path)
    image: {
      type: DataTypes.STRING,
      allowNull: false, // இந்த புலம் காலியாக இருக்கக் கூடாது
    },
    // 💡 Cloudinary Public ID - படங்களை நீக்க இது அவசியம்
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 🔹 படத்தின் object position (Tailwind-க்கான CSS mapping)
    objectPosition: {
      type: DataTypes.STRING(50),
      allowNull: true, // காலியாக இருக்கலாம்
      defaultValue: "object-center", // இயல்புநிலை மதிப்பு
    },

    // 🔹 எழுத்துருவின் வடிவம் (Font Variant - Raw size அல்ல, Theme mapping)
    fontVariant: {
      type: DataTypes.ENUM("normal", "highlight", "hero"), // அனுமதிக்கப்பட்ட மதிப்புகள்
      allowNull: false,
      defaultValue: "hero",
    },
    // 🔹 ஸ்லைடு வரிசை (Slide Order - 1, 2, 3...)
    slideOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // 🔹 செயற்பாடு / செயற்பாடின்மை (Active / Inactive)
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // இயல்புநிலை மதிப்பு 'true'
    },
  },
  {
    tableName: "carousel_slides", // Database-இல் உள்ள அட்டவணைப் பெயர் (Table Name)
    timestamps: true, // createdAt & updatedAt போன்ற கால முத்திரைகளை (Timestamps) சேர்க்கவும்

    // 💡 Hooks (Life Cycle Events)a
    hooks: {
      // 1. Delete hook: ஒரு row நீக்கப்படும் முன் Cloudinary-ஐ நீக்க
      beforeDestroy: async (slide, options) => {
        // நீக்கும் முன் publicId இருந்தால், Cloudinary-இல் இருந்து நீக்கவும்
        if (slide.publicId) {
          await cloudinary.uploader.destroy(slide.publicId); // ⚠️ இந்த வரியை uncomment செய்யவும்
          console.log(
            `Cloudinary image deleted successfully: ${slide.publicId}`
          );
        }
      },
    },

    // 2. Update hook: image மாறினால், பழைய படத்தை நீக்க
    beforeUpdate: async (slide, options) => {
      // image மாறியிருக்கிறதா என சரிபார்க்கவும் (isSoftDeleted போன்ற field-கள் மாறினால் நீக்கக்கூடாது)
      if (slide.changed("image") || slide.changed("publicId")) {
        const oldImagePublicId = slide.previous("publicId");
        // பழைய Public ID இருந்தால், அதை Cloudinary-இல் இருந்து நீக்கவும்
        if (oldImagePublicId) {
          await cloudinary.uploader.destroy(oldImagePublicId); // ⚠️ இந்த வரியை uncomment செய்யவும்
          console.log(
            `Old Cloudinary image deleted successfully during update: ${oldImagePublicId}`
          );
        }
      }
    },
  }
);

module.exports = CarouselSlide;
