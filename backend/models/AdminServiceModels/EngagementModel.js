const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const EngagementModel = sequelize.define(
  "EngagementModel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // 1. 📄 மொத்த செக்ஷனுக்கான தலைப்பு (எ.கா: Choose Your Perfect Engagement Model)
    pageTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // 2. 📝 செக்ஷனுக்கான சிறு விளக்கம் (எ.கா: We offer flexible partnership models...)
    pageDesc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // 3. 🏷️ கார்டின் தலைப்பு (எ.கா: Fixed Cost Model)
    subtitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // 4. 📖 கார்டின் விளக்கம் (எ.கா: Clear scope, fixed timeline...)
    para: {
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
    tableName: "engagement_models",
    timestamps: true,
  }
);

module.exports = EngagementModel;
