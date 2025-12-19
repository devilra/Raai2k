const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const { cloudinary } = require("../../config/cloudinaryConfig");

const GlobalLeadership = sequelize.define(
  "GlobalLeadership",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // 1. 🌍 Main Title (உதாரணம்: Global Leadership)
    mainTitle: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "Global Leadership",
    },

    // 2. 🖼️ Member Image (Avatar URL)
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 💡 Cloudinary Public ID (For deletion)
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 3. 💼 Role / Title (உதாரணம்: COO, B2B, Business Analyst)
    role: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    // 4. 🏷️ Sub-Role / Department (உதாரணம்: Strategy & Ops)
    // இதுதான் நீங்கள் கேட்ட அந்த இரண்டாவது வரி.
    subTitle: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    // 5. 📝 Description
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // 🔹 வரிசைப்படுத்துவதற்கு (Ordering)
    slideOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    // 🔹 நிலை (Active or Inactive)
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "global_leadership",
    timestamps: true,

    hooks: {
      // Row நீக்கப்படும் போது Cloudinary-ல் இருந்தும் படத்தை நீக்க
      beforeDestroy: async (member) => {
        if (member.publicId) {
          try {
            await cloudinary.uploader.destroy(member.publicId);
            console.log(`Image deleted from Cloudinary: ${member.publicId}`);
          } catch (error) {
            console.error("Cloudinary Delete Error:", error);
          }
        }
      },

      // படம் மாற்றப்பட்டால் பழைய படத்தை Cloudinary-ல் இருந்து நீக்க
      beforeUpdate: async (member) => {
        if (member.changed("publicId")) {
          const oldPublicId = member.previous("publicId");
          if (oldPublicId) {
            try {
              await cloudinary.uploader.destroy(oldPublicId);
              console.log(`Old image deleted from Cloudinary: ${oldPublicId}`);
            } catch (error) {
              console.error("Cloudinary Update Delete Error:", error);
            }
          }
        }
      },
    },
  }
);

module.exports = GlobalLeadership;
