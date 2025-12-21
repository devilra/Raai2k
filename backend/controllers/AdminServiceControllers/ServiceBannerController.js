const { cloudinary } = require("../../config/cloudinaryConfig");
const ServiceBanner = require("../../models/AdminServiceModels/ServiceBanner");

// 1. அனைத்து Service Banner-களையும் பெறுதல் (READ All - List Mode)
exports.getServiceBanners = async (req, res) => {
  try {
    const banners = await ServiceBanner.findAll({
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json(banners);
  } catch (error) {
    console.error("Error fetching service banners:", error);
    return res.status(500).json({ message: "Service Banners fetch failed" });
  }
};

// 2. UI-க்கு (Front-end) ஆக்டிவாக உள்ள பேனர்களைப் பெறுதல் (READ Active)
exports.getPublishedServiceBanners = async (req, res) => {
  try {
    const publishedBanners = await ServiceBanner.findAll({
      where: {
        isActive: true,
      },
      order: [["createdAt", "ASC"]],
    });

    if (publishedBanners.length === 0) {
      return res.status(200).json({
        message: "No active Service Banner found.",
        content: [],
      });
    }

    return res.status(200).json(publishedBanners);
  } catch (error) {
    console.error("Error fetching published Service banners:", error);
    return res
      .status(500)
      .json({ message: "Published Service Banners fetch failed" });
  }
};

// 3. புதிய Service Banner-ஐ உருவாக்குதல் (CREATE)
exports.createServiceBanner = async (req, res) => {
  try {
    const { title, description, fontVariant, isActive } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is mandatory." });
    }

    let image = null;
    let publicId = null;

    if (req.file) {
      image = req.file.path;
      publicId = req.file.filename;
    }

    const newBanner = await ServiceBanner.create({
      title,
      description,
      image,
      publicId,
      fontVariant: fontVariant || "hero",
      isActive: isActive === "true" || isActive === true,
    });

    return res.status(201).json({
      message: "Service Banner created successfully.",
      content: newBanner,
    });
  } catch (error) {
    console.error("Error creating Service banner:", error);
    return res.status(500).json({
      message: "Banner creation failed.",
      details: error.message,
    });
  }
};

// 4. Service Banner-ஐப் புதுப்பித்தல் (UPDATE)
exports.updateServiceBanner = async (req, res) => {
  const { id } = req.params;
  const { title, description, fontVariant, isActive } = req.body;
  let newImage = null;

  try {
    const banner = await ServiceBanner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ message: "Service Banner not found" });
    }

    if (req.file) {
      newImage = req.file.path;
      banner.image = newImage;
      banner.publicId = req.file.filename;
    }

    banner.title = title || banner.title;
    banner.description = description || banner.description;
    banner.fontVariant = fontVariant || banner.fontVariant;

    if (isActive !== undefined) {
      banner.isActive = isActive === "true" || isActive === true;
    }

    await banner.save();

    return res.status(200).json({
      message: "Service Banner updated successfully",
      content: banner,
    });
  } catch (error) {
    console.error("Error updating Service banner:", error);
    if (req.file && req.file.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    return res.status(500).json({ message: "Service Banner Update Error" });
  }
};

// 5. Service Banner-ஐ நீக்குதல் (DELETE)
exports.deleteServiceBanner = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await ServiceBanner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ message: "Service Banner not found" });
    }

    await banner.destroy();

    return res
      .status(200)
      .json({ message: "Service Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting Service banner:", error);
    return res.status(500).json({ message: "Service Banner deleted Error" });
  }
};
