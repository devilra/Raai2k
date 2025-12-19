const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const ThingsYouGet = sequelize.define(
  "ThingsYouGet", // ஸ்கீமா பெயர் மாற்றம் செய்யப்பட்டுள்ளது
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // 1. 🏢 Main Section Title (எ.கா: Things You Get)
    mainTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // 2. 🏷️ Item Sub-Heading (எ.கா: Fintech Product Strategy)
    subHeading: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // 3. 📝 Description (எ.கா: MVP scope, product roadmap...)
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // 🔹 வரிசைப்படுத்துவதற்கு
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
    tableName: "things_you_get", // டேபிள் பெயர் மாற்றம் செய்யப்பட்டுள்ளது
    timestamps: true,
  }
);

module.exports = ThingsYouGet;
