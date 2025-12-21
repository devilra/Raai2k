const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const IndustriesWeServe = sequelize.define(
  "IndustriesWeServe",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // 1. 🏢 Main Section Title (எ.கா: Industries We Serve)
    mainTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "Industries We Serve",
    },

    // 2. 🏷️ Industry Name (எ.கா: Retail Banking & Neobanks)
    industryName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // 3. 📝 Description (எ.கா: Next-gen digital banking platforms...)
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // 4. 🔢 Industry Number (படத்தில் உள்ள 1, 2, 3...)
    // industryNumber: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },

    // 5. ✨ Icon Class or Name (படத்தில் வலது கீழ் மூலையில் உள்ள Icons-க்கு)
    // இதை React Icons பெயர் அல்லது SVG string ஆகப் பயன்படுத்தலாம்
    // iconName: {
    //   type: DataTypes.STRING(100),
    //   allowNull: true,
    // },

    // 🔹 வரிசைப்படுத்துவதற்கு (Admin Panel-ல் மாற்றுவதற்கு)
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
    tableName: "industries_we_serve",
    timestamps: true,
  }
);

module.exports = IndustriesWeServe;
