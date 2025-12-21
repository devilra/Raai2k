const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const CaseStudy = sequelize.define(
  "CaseStudy",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // 1. 📄 மெயின் டைட்டில் (எ.கா: Case Studies)
    pageTitle: {
      type: DataTypes.STRING,
      defaultValue: "Case Studies",
    },
    // 2. 🏷️ கார்டின் தலைப்பு (எ.கா: Digital Wallet for a Neobank)
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 3. ✅ லிஸ்ட் பாயிண்டுகள் (JSON Array-ஆக சேமிக்கப்படும்)
    // Format: ["Built a mobile wallet", "Integrated KYC", "Achieved 30% increase"]
    points: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: "Stores the bullet points as an array of strings",
    },
    // 🔹 வரிசைப்படுத்துவதற்கு (Display Order)
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // 🔹 நிலை (Active/Inactive)
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "case_studies",
    timestamps: true,
  }
);

module.exports = CaseStudy;
