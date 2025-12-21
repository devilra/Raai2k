const EngagementModel = require("../../models/AdminServiceModels/EngagementModel");

// --- 1. புதிய ஒன்றை உருவாக்குதல் (CREATE) ---
exports.createEngagementModel = async (req, res) => {
  try {
    const { pageTitle, pageDesc, subtitle, para, order, isActive } = req.body;

    // கட்டாயத் தேவைகளைச் சரிபார்த்தல்
    if (!pageTitle || !pageDesc || !subtitle || !para) {
      return res.status(400).json({
        message:
          "Page Title, Page Description, Subtitle and Para are required.",
      });
    }

    const newEntry = await EngagementModel.create({
      pageTitle,
      pageDesc,
      subtitle,
      para,
      order: order || 1,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      message: "Engagement Model created successfully.",
      data: newEntry,
    });
  } catch (error) {
    console.error("Error creating EngagementModel:", error);
    return res.status(500).json({ message: "Server error during creation." });
  }
};

// --- 2. ID மூலம் ஒன்றைப் பெறுதல் (READ BY ID) ---
exports.getEngagementModelById = async (req, res) => {
  try {
    const data = await EngagementModel.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Engagement model not found." });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Engagement Model by ID:", error);
    return res.status(500).json({ message: "Server error fetching content." });
  }
};

// --- 3. தகவல்களைப் புதுப்பித்தல் (UPDATE) ---
exports.updateEngagementModel = async (req, res) => {
  try {
    const { pageTitle, pageDesc, subtitle, para, order, isActive } = req.body;
    const { id } = req.params;

    const entry = await EngagementModel.findByPk(id);

    if (!entry) {
      return res.status(404).json({ message: "Engagement model not found." });
    }

    // அனுப்பப்பட்ட தரவுகளை மட்டும் புதுப்பித்தல்
    entry.pageTitle = pageTitle !== undefined ? pageTitle : entry.pageTitle;
    entry.pageDesc = pageDesc !== undefined ? pageDesc : entry.pageDesc;
    entry.subtitle = subtitle !== undefined ? subtitle : entry.subtitle;
    entry.para = para !== undefined ? para : entry.para;
    entry.order = order !== undefined ? order : entry.order;

    if (isActive !== undefined) {
      entry.isActive = isActive === "true" || isActive === true;
    }

    await entry.save();

    return res.status(200).json({
      message: "Engagement Model updated successfully.",
      data: entry,
    });
  } catch (error) {
    console.error("Error updating EngagementModel:", error);
    return res.status(500).json({ message: "Server error during update." });
  }
};

// --- 4. தகவலை நீக்குதல் (DELETE) ---
exports.deleteEngagementModel = async (req, res) => {
  try {
    const entry = await EngagementModel.findByPk(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Engagement model not found." });
    }

    await entry.destroy();

    return res
      .status(200)
      .json({ message: "Engagement model deleted successfully." });
  } catch (error) {
    console.error("Error deleting EngagementModel:", error);
    return res.status(500).json({ message: "Server error during deletion." });
  }
};

// --- 5. அனைத்து தகவல்களையும் பெறுதல் (ADMIN - GET ALL) ---
exports.getAllEngagementModels = async (req, res) => {
  try {
    const allData = await EngagementModel.findAll({
      order: [["order", "ASC"]],
    });

    return res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching all Engagement Models:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching all contents." });
  }
};

// --- 6. Active நிலையில் உள்ளவற்றை மட்டும் பெறுதல் (PUBLIC - FRONTEND) ---
exports.getActiveEngagementModels = async (req, res) => {
  try {
    const activeData = await EngagementModel.findAll({
      where: { isActive: true },
      order: [["order", "ASC"]],
    });

    return res.status(200).json(activeData);
  } catch (error) {
    console.error("Error fetching active Engagement Models:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching active content." });
  }
};
