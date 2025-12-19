const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const { cloudinary } = require("../../config/cloudinaryConfig");

const ClientTestimonial = sequelize.define(
  "ClientTestimonial",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // 1. 🖼️ Client Image (உதாரணம்: புகைப்படங்கள்)
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 💡 Cloudinary Public ID (நீக்குவதற்கும் அப்டேட் செய்வதற்கும்)
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 2. 💬 Testimonial Quote (உதாரணம்: "They handled everything...")
    quote: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // 3. 👤 Client Name (உதாரணம்: Founder, Wallet Startup)
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    // 4. 🏢 Position/Role (உதாரணம்: Founder)
    position: {
      type: DataTypes.STRING(100),
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
    tableName: "client_testimonials",
    timestamps: true,

    hooks: {
      // Row நீக்கப்படும் போது Cloudinary-ல் இருந்தும் படத்தை நீக்க
      beforeDestroy: async (testimonial) => {
        if (testimonial.publicId) {
          try {
            await cloudinary.uploader.destroy(testimonial.publicId);
            console.log(
              `Testimonial image deleted from Cloudinary: ${testimonial.publicId}`
            );
          } catch (error) {
            console.error("Cloudinary Delete Error:", error);
          }
        }
      },

      // படம் மாற்றப்பட்டால் பழைய படத்தை Cloudinary-ல் இருந்து நீக்க
      beforeUpdate: async (testimonial) => {
        if (testimonial.changed("publicId")) {
          const oldPublicId = testimonial.previous("publicId");
          if (oldPublicId) {
            try {
              await cloudinary.uploader.destroy(oldPublicId);
              console.log(`Old testimonial image deleted: ${oldPublicId}`);
            } catch (error) {
              console.error("Cloudinary Update Delete Error:", error);
            }
          }
        }
      },
    },
  }
);

module.exports = ClientTestimonial;
