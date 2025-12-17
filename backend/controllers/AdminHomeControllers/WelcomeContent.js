const WelcomeContent = require("../../models/AdminHomeModels/WelcomeContent");

// --- 1. Welcome Content-ஐ உருவாக்குதல் (POST /api/admin/welcome-content) ---
exports.createWelcomeContent = async (req, res) => {
  // பொதுவாக WelcomeContent-இல் ஒரே ஒரு entry இருக்க வேண்டும்.
  // எனவே, ஏற்கனவே உள்ளதா எனச் சரிபார்ப்பது அவசியம்
  try {
    // const existingContent = await WelcomeContent.findOne();
    // if (existingContent) {
    //   return res.status(400).json({
    //     message:
    //       "Welcome Content already exists. Please use the update endpoint to modify it.",
    //   });
    // }

    const { mainHeading, subText, order, sectionActive } = req.body;

    if (!mainHeading || !subText) {
      return res
        .status(400)
        .json({ message: "Main Heading and Sub Text are required." });
    }

    const newContent = await WelcomeContent.create({
      mainHeading,
      subText,
      order,
      sectionActive,
    });

    return res.status(201).json({
      message: "Welcome content created successfully.",
      content: newContent,
    });
  } catch (error) {
    console.error("Error creating welcome content:", error);
    return res.status(500).json({ message: "Server error during creation." });
  }
};

// --- 2. ID மூலம் ஒரு Welcome Content-ஐப் பெறுதல் (GET /api/admin/welcome-content/:id) ---
// Admin Edit Form-க்கு தேவைப்படும். Features-ஐயும் இணைத்துப் பெறலாம்.

exports.getWelcomeContentById = async (req, res) => {
  try {
    const content = await WelcomeContent.findByPk(req.params.id);

    if (!content) {
      return res.status(404).json({ message: "Welcome Content not found." });
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching welcome content by ID:", error);
    return res.status(500).json({ message: "Server error fetching content." });
  }
};

// --- 3. Welcome Content-ஐப் புதுப்பித்தல் (PUT /api/admin/welcome-content/:id) ---
exports.updateWelcomeContent = async (req, res) => {
  try {
    const { mainHeading, subText, order, sectionActive } = req.body;
    const contentId = req.params.id;

    console.log(req.body);

    const content = await WelcomeContent.findByPk(contentId);

    if (!content) {
      return res.status(404).json({ message: "Welcome Content not found." });
    }

    // Field-கள் இருந்தால் மட்டுமே புதுப்பிக்கவும்
    content.mainHeading =
      mainHeading !== undefined ? mainHeading : content.mainHeading;
    content.subText = subText !== undefined ? subText : content.subText;
    content.order = order !== undefined ? order : content.order;
    content.sectionActive =
      sectionActive !== undefined ? sectionActive : content.sectionActive;

    await content.save();

    return res.status(200).json({
      message: "Welcome content updated successfully.",
      content,
    });
  } catch (error) {
    console.error("Error updating welcome content:", error);
    return res.status(500).json({ message: "Server error during update." });
  }
};

// --- 4. Welcome Content-ஐ நீக்குதல் (DELETE /api/admin/welcome-content/:id) ---
exports.deleteWelcomeContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const content = await WelcomeContent.findByPk(contentId);

    if (!content) {
      return res.status(404).json({ message: "Welcome Content not found." });
    }

    // ❌ Features நீக்கப்பட்டதால், CASCADE நீக்கப்பட்டது
    await content.destroy();

    return res
      .status(200)
      .json({ message: "Welcome Content deleted successfully." });
  } catch (error) {
    console.error("Error deleting welcome content:", error);
    return res.status(500).json({ message: "Server error during deletion." });
  }
};

// --- 5. அனைத்து Welcome Content-களையும் பெறுதல் (GET /api/admin/welcome-content/all) ---
// Admin Listing Table-க்கு

exports.getAllWelcomeContent = async (req, res) => {
  try {
    // Admin Listing-க்காக அனைத்து entry-களையும் பெறுக
    const contents = await WelcomeContent.findAll({
      order: [["order", "ASC"]],
    });

    return res.status(200).json(contents);
  } catch (error) {
    console.error("Error fetching all welcome contents:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching all contents." });
  }
};

// --- 6. Front-end-க்கு Active Content-ஐப் பெறுதல் (GET /api/public/welcome-content) ---

exports.getWelcomeContent = async (req, res) => {
  try {
    const content = await WelcomeContent.findOne({
      where: {
        sectionActive: true,
      },
      order: [["order", "ASC"]],
    });

    if (!content) {
      return res.status(200).json({
        mainHeading: "Welcome Section",
        subText: "Content not set yet.",
      });
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching welcome content:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching welcome content." });
  }
};
