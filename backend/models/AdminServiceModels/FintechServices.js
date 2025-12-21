const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const FinTechService = sequelize.define(
  "FinTechService",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // 1. 📄 Page Title (எ.கா: FinTech Services)
    pageTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "FinTech Services",
    },

    // 2. 🏷️ Service Heading (எ.கா: Fintech Product Strategy)
    heading: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // 3. 📝 Description (எ.கா: MVP scope, product roadmap...)
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // 🔹 வரிசைப்படுத்துவதற்கு
    order: {
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
    tableName: "fintech_services",
    timestamps: true,
  }
);

module.exports = FinTechService;
