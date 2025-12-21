const IndustriesWeServe = require("../../models/AdminServiceModels/IndustryWeServe");

// --- 1. புதிய ஒன்றை உருவாக்குதல் (CREATE) ---
exports.createIndustriesWeServe = async (req, res) => {
  try {
    const {
      mainTitle,
      industryName,
      description,
      //   industryNumber,
      //   iconName,
      order,
      isActive,
    } = req.body;

    // கட்டாயத் தேவைகளைச் சரிபார்த்தல் (industryName மற்றும் description அவசியம்)
    if (!industryName || !description) {
      return res.status(400).json({
        message: "Industry Name and Description are required.",
      });
    }

    const newEntry = await IndustriesWeServe.create({
      mainTitle: mainTitle || "Industries We Serve",
      industryName,
      description,
      //   industryNumber,
      //   iconName,
      order: order || 1,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      message: "Industry entry created successfully.",
      data: newEntry,
    });
  } catch (error) {
    console.error("Error creating IndustriesWeServe:", error);
    return res.status(500).json({ message: "Server error during creation." });
  }
};

// --- 2. ID மூலம் ஒன்றைப் பெறுதல் (READ BY ID) ---
exports.getIndustryById = async (req, res) => {
  try {
    const data = await IndustriesWeServe.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Industry content not found." });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Industry by ID:", error);
    return res.status(500).json({ message: "Server error fetching content." });
  }
};

// --- 3. தகவல்களைப் புதுப்பித்தல் (UPDATE) ---
exports.updateIndustriesWeServe = async (req, res) => {
  try {
    const {
      mainTitle,
      industryName,
      description,
      //   industryNumber,
      //   iconName,
      order,
      isActive,
    } = req.body;
    const { id } = req.params;

    const entry = await IndustriesWeServe.findByPk(id);

    if (!entry) {
      return res.status(404).json({ message: "Industry content not found." });
    }

    // அனுப்பப்பட்ட தரவுகளை மட்டும் புதுப்பித்தல்
    entry.mainTitle = mainTitle !== undefined ? mainTitle : entry.mainTitle;
    entry.industryName =
      industryName !== undefined ? industryName : entry.industryName;
    entry.description =
      description !== undefined ? description : entry.description;
    // entry.industryNumber =
    //   industryNumber !== undefined ? industryNumber : entry.industryNumber;
    // entry.iconName = iconName !== undefined ? iconName : entry.iconName;
    entry.order = order !== undefined ? order : entry.order;

    if (isActive !== undefined) {
      entry.isActive = isActive === "true" || isActive === true;
    }

    await entry.save();

    return res.status(200).json({
      message: "Industry content updated successfully.",
      data: entry,
    });
  } catch (error) {
    console.error("Error updating IndustriesWeServe:", error);
    return res.status(500).json({ message: "Server error during update." });
  }
};

// --- 4. தகவலை நீக்குதல் (DELETE) ---
exports.deleteIndustriesWeServe = async (req, res) => {
  try {
    const entry = await IndustriesWeServe.findByPk(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Industry content not found." });
    }

    await entry.destroy();

    return res
      .status(200)
      .json({ message: "Industry content deleted successfully." });
  } catch (error) {
    console.error("Error deleting IndustriesWeServe:", error);
    return res.status(500).json({ message: "Server error during deletion." });
  }
};

// --- 5. அனைத்து தகவல்களையும் பெறுதல் (ADMIN - GET ALL) ---
exports.getAllIndustriesWeServe = async (req, res) => {
  try {
    const allData = await IndustriesWeServe.findAll({
      order: [["order", "ASC"]],
    });

    return res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching all industry contents:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching all contents." });
  }
};

// --- 6. Active நிலையில் உள்ளவற்றை மட்டும் பெறுதல் (PUBLIC - FRONTEND) ---
exports.getActiveIndustriesWeServe = async (req, res) => {
  try {
    const activeData = await IndustriesWeServe.findAll({
      where: { isActive: true },
      order: [["order", "ASC"]],
    });

    return res.status(200).json(activeData);
  } catch (error) {
    console.error("Error fetching active industry contents:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching active content." });
  }
};
