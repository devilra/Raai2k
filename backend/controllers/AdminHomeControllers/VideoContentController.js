const VideoContent = require("../../models/AdminHomeModels/VideoContent");

// --- 1. Video Content-ஐ உருவாக்குதல் (POST /api/admin/video-content) ---
exports.createVideoContent = async (req, res) => {
  try {
    const { mainHeading, subText, order, sectionActive } = req.body;

    // கட்டாயமாக தேவைப்படும் ஃபீல்டுகள்
    if (!mainHeading) {
      return res.status(400).json({ message: "Main Heading is required." });
    }

    const newContent = await VideoContent.create({
      mainHeading,
      subText,
      order,
      sectionActive,
    });

    return res.status(201).json({
      message: "Video content created successfully.",
      content: newContent,
    });
  } catch (error) {
    console.error("Error creating video content:", error);
    return res.status(500).json({ message: "Server error during creation." });
  }
};

// --- 2. ID மூலம் ஒரு Video Content-ஐப் பெறுதல் (GET /api/admin/video-content/:id) ---
exports.getVideoContentById = async (req, res) => {
  try {
    const content = await VideoContent.findByPk(req.params.id);

    if (!content) {
      return res.status(404).json({ message: "Video Content not found." });
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching video content by ID:", error);
    return res.status(500).json({ message: "Server error fetching content." });
  }
};

// --- 3. Video Content-ஐப் புதுப்பித்தல் (PUT /api/admin/video-content/:id) ---
exports.updateVideoContent = async (req, res) => {
  try {
    const { mainHeading, subText, order, sectionActive } = req.body;
    const contentId = req.params.id;

    const content = await VideoContent.findByPk(contentId);

    if (!content) {
      return res.status(404).json({ message: "Video Content not found." });
    }

    // ஃபீல்டுகள் இருந்தால் மட்டும் அப்டேட் செய்யவும்
    content.mainHeading =
      mainHeading !== undefined ? mainHeading : content.mainHeading;
    content.subText = subText !== undefined ? subText : content.subText;
    content.order = order !== undefined ? order : content.order;
    content.sectionActive =
      sectionActive !== undefined ? sectionActive : content.sectionActive;

    await content.save();

    return res.status(200).json({
      message: "Video content updated successfully.",
      content,
    });
  } catch (error) {
    console.error("Error updating video content:", error);
    return res.status(500).json({ message: "Server error during update." });
  }
};

// --- 4. Video Content-ஐ நீக்குதல் (DELETE /api/admin/video-content/:id) ---
exports.deleteVideoContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const content = await VideoContent.findByPk(contentId);

    if (!content) {
      return res.status(404).json({ message: "Video Content not found." });
    }

    await content.destroy();

    return res
      .status(200)
      .json({ message: "Video Content deleted successfully." });
  } catch (error) {
    console.error("Error deleting video content:", error);
    return res.status(500).json({ message: "Server error during deletion." });
  }
};

// --- 5. அனைத்து Video Content-களையும் பெறுதல் (GET /api/admin/video-content/all) ---
// அட்மின் டேபிளில் காண்பிக்க
exports.getAllVideoContent = async (req, res) => {
  try {
    const contents = await VideoContent.findAll({
      order: [["order", "ASC"]],
    });

    return res.status(200).json(contents);
  } catch (error) {
    console.error("Error fetching all video contents:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching all contents." });
  }
};

// --- 6. Front-end-க்கு Active Video Content-ஐப் பெறுதல் (GET /api/public/video-content) ---
exports.getActiveVideoContent = async (req, res) => {
  try {
    const content = await VideoContent.findAll({
      where: {
        sectionActive: true,
      },
      order: [["order", "ASC"]],
    });

    return res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching active video content:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching video content." });
  }
};
