const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const { cloudinary } = require("../../config/cloudinaryConfig");

const LatestNews = sequelize.define(
  "LatestNews",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // 1. 🌍 Page/Section Title (உதாரணம்: Latest News)
    pageTitle: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "Latest News",
    },

    // 2. 🖼️ News Image
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 💡 Cloudinary Public ID (For deletion/update)
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 3. 📰 News Title (உதாரணம்: What brexit means for data protection law)
    newsTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // 4. ✍️ Author Name (உதாரணம்: By Enrico Ambrosi)
    byName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    // 5. 📝 Description (சுருக்கமான விவரம்)
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // 🔗 Learn More Link (Optional - பட்டனுக்காக தேவைப்படலாம்)
    link: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#",
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
    tableName: "latest_news",
    timestamps: true,

    hooks: {
      // Row நீக்கப்படும் போது Cloudinary-ல் இருந்தும் படத்தை நீக்க
      beforeDestroy: async (news) => {
        if (news.publicId) {
          try {
            await cloudinary.uploader.destroy(news.publicId);
            console.log(`News image deleted from Cloudinary: ${news.publicId}`);
          } catch (error) {
            console.error("Cloudinary Delete Error:", error);
          }
        }
      },

      // படம் மாற்றப்பட்டால் பழைய படத்தை Cloudinary-ல் இருந்து நீக்க
      beforeUpdate: async (news) => {
        if (news.changed("publicId")) {
          const oldPublicId = news.previous("publicId");
          if (oldPublicId) {
            try {
              await cloudinary.uploader.destroy(oldPublicId);
              console.log(
                `Old news image deleted from Cloudinary: ${oldPublicId}`
              );
            } catch (error) {
              console.error("Cloudinary Update Delete Error:", error);
            }
          }
        }
      },
    },
  }
);

module.exports = LatestNews;
