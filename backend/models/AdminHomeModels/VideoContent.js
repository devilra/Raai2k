const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const VideoContent = sequelize.define(
  "VideoContent",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mainHeading: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "main heading",
    },
    subText: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Brief description below the title",
    },
    // videoUrl: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   comment: "The URL of the video (YouTube/Vimeo link)",
    // },
    // thumbnailImage: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   comment: "Placeholder image path before the video plays",
    // },
    // 🔹 Display order (Control which video shows first if multiple)
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // 🔹 Active Status
    sectionActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "video_contents",
    timestamps: true,
  }
);

module.exports = VideoContent;
