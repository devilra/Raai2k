// models/AdminAboutModels/OurApproach.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const AboutOurApproach = sequelize.define(
  "AboutOurApproach",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Main Title: "Our Approach"
    pageTitle: {
      type: DataTypes.STRING,
      defaultValue: "Our Approach",
    },
    // Approach Cards: 3 கார்டுகளின் தரவுகளையும் JSON Array-ஆக சேமிக்க
    // Example Format:
    // [
    //   { "title": "How We Work", "points": ["Understand the business", "Engineer the right solution", ...] },
    //   { "title": "Our Mission", "points": ["Bridge technology and finance", ...] }
    // ]
    approachCards: {
      type: DataTypes.JSON,
      allowNull: false,
      comment:
        "Stores an array of objects containing card title and bullet points",
    },
    // Bottom Description: "We become your extended tech partner..."
    footerDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "our_approaches",
    timestamps: true,
  }
);

module.exports = AboutOurApproach;
