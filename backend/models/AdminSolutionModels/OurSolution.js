const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const OurSolution = sequelize.define(
  "OurSolution",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mainHeading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // 🔹 Display order (Home page order control)
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // பெரிய Text-ஐ சேமிக்க
    // இந்த Section Active ஆக இருக்கிறதா இல்லையா (Admin-க்கு)
    sectionActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "our_solutions",
    timestamps: true,
  }
);

module.exports = OurSolution;
