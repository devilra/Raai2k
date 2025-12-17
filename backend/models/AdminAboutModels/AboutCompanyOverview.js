// models/AdminAboutModels/CompanyOverview.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const CompanyOverview = sequelize.define(
  "CompanyOverview",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Main Title: "Company Overview"
    pageTitle: {
      type: DataTypes.STRING,
      defaultValue: "Company Overview",
    },
    // Card Subtitle: "Build Fast. Scale Smart. Launch Confidently."
    cardSubtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Main Description: "At Raai2k, we help startups..."
    mainDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Highlight Quote: "We turn complex fintech ideas..."
    highlightQuote: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Grid Content: கீழேயுள்ள 5 பத்திகளை (Paragraphs) Array-ஆக சேமிக்க
    gridContent: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "Stores an array of strings for the grid section",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    // 💡 டேபிள் பெயர் இங்கே குறிப்பிடப்பட்டுள்ளது
    tableName: "company_overviews",
    timestamps: true,
  }
);

module.exports = CompanyOverview;
