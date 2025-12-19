const ThingsYouGet = require("../../models/AdminHomeModels/ThinkYouGet");

// --- 1. புதிய ஒன்றை உருவாக்குதல் (CREATE) ---
exports.createThingsYouGet = async (req, res) => {
  try {
    const { mainTitle, subHeading, description, slideOrder, isActive } =
      req.body;

    // கட்டாயத் தேவைகளைச் சரிபார்த்தல்
    if (!mainTitle || !subHeading || !description) {
      return res.status(400).json({
        message: "Main Title, Sub Heading and Description are required.",
      });
    }

    const newEntry = await ThingsYouGet.create({
      mainTitle,
      subHeading,
      description,
      slideOrder: slideOrder || 1,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      message: "Entry created successfully.",
      data: newEntry,
    });
  } catch (error) {
    console.error("Error creating ThingsYouGet:", error);
    return res.status(500).json({ message: "Server error during creation." });
  }
};

// --- 2. ID மூலம் ஒன்றைப் பெறுதல் (READ BY ID) ---
exports.getThingsYouGetById = async (req, res) => {
  try {
    const data = await ThingsYouGet.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Content not found." });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching by ID:", error);
    return res.status(500).json({ message: "Server error fetching content." });
  }
};

// --- 3. தகவல்களைப் புதுப்பித்தல் (UPDATE) ---
exports.updateThingsYouGet = async (req, res) => {
  try {
    const { mainTitle, subHeading, description, slideOrder, isActive } =
      req.body;
    const { id } = req.params;

    const entry = await ThingsYouGet.findByPk(id);

    if (!entry) {
      return res.status(404).json({ message: "Content not found." });
    }

    // அனுப்பப்பட்ட தரவுகளை மட்டும் புதுப்பித்தல்
    entry.mainTitle = mainTitle !== undefined ? mainTitle : entry.mainTitle;
    entry.subHeading = subHeading !== undefined ? subHeading : entry.subHeading;
    entry.description =
      description !== undefined ? description : entry.description;
    entry.slideOrder = slideOrder !== undefined ? slideOrder : entry.slideOrder;
    entry.isActive =
      isActive !== undefined
        ? isActive === "true" || isActive === true
        : entry.isActive;

    await entry.save();

    return res.status(200).json({
      message: "Content updated successfully.",
      data: entry,
    });
  } catch (error) {
    console.error("Error updating ThingsYouGet:", error);
    return res.status(500).json({ message: "Server error during update." });
  }
};

// --- 4. தகவலை நீக்குதல் (DELETE) ---
exports.deleteThingsYouGet = async (req, res) => {
  try {
    const entry = await ThingsYouGet.findByPk(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Content not found." });
    }

    await entry.destroy();

    return res.status(200).json({ message: "Content deleted successfully." });
  } catch (error) {
    console.error("Error deleting ThingsYouGet:", error);
    return res.status(500).json({ message: "Server error during deletion." });
  }
};

// --- 5. அனைத்து தகவல்களையும் பெறுதல் (ADMIN - GET ALL) ---
exports.getAllThingsYouGet = async (req, res) => {
  try {
    const allData = await ThingsYouGet.findAll({
      order: [["slideOrder", "ASC"]],
    });

    return res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching all contents:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching all contents." });
  }
};

// --- 6. Active நிலையில் உள்ளவற்றை மட்டும் பெறுதல் (PUBLIC - FRONTEND) ---
exports.getActiveThingsYouGet = async (req, res) => {
  try {
    const activeData = await ThingsYouGet.findAll({
      where: { isActive: true },
      order: [["slideOrder", "ASC"]],
    });

    return res.status(200).json(activeData);
  } catch (error) {
    console.error("Error fetching active contents:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching active content." });
  }
};
