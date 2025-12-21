const FinTechService = require("../../models/AdminServiceModels/FintechServices");

// --- 1. புதிய ஒன்றை உருவாக்குதல் (CREATE) ---
exports.createFinTechService = async (req, res) => {
  try {
    const { pageTitle, heading, description, order, isActive } = req.body;

    // கட்டாயத் தேவைகளைச் சரிபார்த்தல்
    if (!heading || !description) {
      return res.status(400).json({
        message: "Heading and Description are required.",
      });
    }

    const newEntry = await FinTechService.create({
      pageTitle: pageTitle || "FinTech Services", // Default value handle செய்யப்படுகிறது
      heading,
      description,
      order: order || 1,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      message: "FinTech Service created successfully.",
      data: newEntry,
    });
  } catch (error) {
    console.error("Error creating FinTechService:", error);
    return res.status(500).json({ message: "Server error during creation." });
  }
};

// --- 2. ID மூலம் ஒன்றைப் பெறுதல் (READ BY ID) ---
exports.getFinTechServiceById = async (req, res) => {
  try {
    const data = await FinTechService.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Service content not found." });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching FinTech Service by ID:", error);
    return res.status(500).json({ message: "Server error fetching content." });
  }
};

// --- 3. தகவல்களைப் புதுப்பித்தல் (UPDATE) ---
exports.updateFinTechService = async (req, res) => {
  try {
    const { pageTitle, heading, description, order, isActive } = req.body;
    const { id } = req.params;

    const entry = await FinTechService.findByPk(id);

    if (!entry) {
      return res.status(404).json({ message: "Service content not found." });
    }

    // அனுப்பப்பட்ட தரவுகளை மட்டும் புதுப்பித்தல்
    entry.pageTitle = pageTitle !== undefined ? pageTitle : entry.pageTitle;
    entry.heading = heading !== undefined ? heading : entry.heading;
    entry.description =
      description !== undefined ? description : entry.description;
    entry.order = order !== undefined ? order : entry.order;

    if (isActive !== undefined) {
      entry.isActive = isActive === "true" || isActive === true;
    }

    await entry.save();

    return res.status(200).json({
      message: "FinTech Service updated successfully.",
      data: entry,
    });
  } catch (error) {
    console.error("Error updating FinTechService:", error);
    return res.status(500).json({ message: "Server error during update." });
  }
};

// --- 4. தகவலை நீக்குதல் (DELETE) ---
exports.deleteFinTechService = async (req, res) => {
  try {
    const entry = await FinTechService.findByPk(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Service content not found." });
    }

    await entry.destroy();

    return res
      .status(200)
      .json({ message: "Service content deleted successfully." });
  } catch (error) {
    console.error("Error deleting FinTechService:", error);
    return res.status(500).json({ message: "Server error during deletion." });
  }
};

// --- 5. அனைத்து தகவல்களையும் பெறுதல் (ADMIN - GET ALL) ---
exports.getAllFinTechServices = async (req, res) => {
  try {
    const allData = await FinTechService.findAll({
      order: [["order", "ASC"]],
    });

    return res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching all FinTech Services:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching all contents." });
  }
};

// --- 6. Active நிலையில் உள்ளவற்றை மட்டும் பெறுதல் (PUBLIC - FRONTEND) ---
exports.getActiveFinTechServices = async (req, res) => {
  try {
    const activeData = await FinTechService.findAll({
      where: { isActive: true },
      order: [["order", "ASC"]],
    });

    return res.status(200).json(activeData);
  } catch (error) {
    console.error("Error fetching active FinTech Services:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching active content." });
  }
};
