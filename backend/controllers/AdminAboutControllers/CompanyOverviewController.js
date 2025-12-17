const CompanyOverview = require("../../models/AdminAboutModels/AboutCompanyOverview");

// --- 1. புதிய Overview-ஐ உருவாக்குதல் (POST) ---
exports.createCompanyOverview = async (req, res) => {
  try {
    const {
      pageTitle,
      cardSubtitle,
      mainDescription,
      highlightQuote,
      gridContent,
      isActive,
    } = req.body;

    // அத்தியாவசியமான புலங்கள் உள்ளனவா எனச் சரிபார்த்தல்
    if (!cardSubtitle || !mainDescription || !highlightQuote) {
      return res.status(400).json({
        message:
          "Subtitle, Main Description, and Highlight Quote are required.",
      });
    }

    const newOverview = await CompanyOverview.create({
      pageTitle,
      cardSubtitle,
      mainDescription,
      highlightQuote,
      gridContent, // இது JSON ஆகச் சேமிக்கப்படும்
      isActive,
    });

    return res.status(201).json({
      message: "Company Overview created successfully.",
      data: newOverview,
    });
  } catch (error) {
    console.error("Error creating company overview:", error);
    return res.status(500).json({ message: "Server error during creation." });
  }
};

// --- 2. ID மூலம் ஒன்றைப் பெறுதல் (GET) ---
exports.getCompanyOverviewById = async (req, res) => {
  try {
    const overview = await CompanyOverview.findByPk(req.params.id);

    if (!overview) {
      return res.status(404).json({ message: "Company Overview not found." });
    }

    return res.status(200).json(overview);
  } catch (error) {
    console.error("Error fetching company overview by ID:", error);
    return res.status(500).json({ message: "Server error fetching overview." });
  }
};

// --- 3. தரவைப் புதுப்பித்தல் (PUT) ---
exports.updateCompanyOverview = async (req, res) => {
  try {
    const {
      pageTitle,
      cardSubtitle,
      mainDescription,
      highlightQuote,
      gridContent,
      isActive,
    } = req.body;

    const overview = await CompanyOverview.findByPk(req.params.id);

    if (!overview) {
      return res.status(404).json({ message: "Company Overview not found." });
    }

    // தரவுகளைப் புதுப்பித்தல்
    overview.pageTitle =
      pageTitle !== undefined ? pageTitle : overview.pageTitle;
    overview.cardSubtitle =
      cardSubtitle !== undefined ? cardSubtitle : overview.cardSubtitle;
    overview.mainDescription =
      mainDescription !== undefined
        ? mainDescription
        : overview.mainDescription;
    overview.highlightQuote =
      highlightQuote !== undefined ? highlightQuote : overview.highlightQuote;
    overview.gridContent =
      gridContent !== undefined ? gridContent : overview.gridContent;
    overview.isActive = isActive !== undefined ? isActive : overview.isActive;

    await overview.save();

    return res.status(200).json({
      message: "Company Overview updated successfully.",
      data: overview,
    });
  } catch (error) {
    console.error("Error updating company overview:", error);
    return res.status(500).json({ message: "Server error during update." });
  }
};

// --- 4. தரவை நீக்குதல் (DELETE) ---
exports.deleteCompanyOverview = async (req, res) => {
  try {
    const overview = await CompanyOverview.findByPk(req.params.id);

    if (!overview) {
      return res.status(404).json({ message: "Company Overview not found." });
    }

    await overview.destroy();

    return res
      .status(200)
      .json({ message: "Company Overview deleted successfully." });
  } catch (error) {
    console.error("Error deleting company overview:", error);
    return res.status(500).json({ message: "Server error during deletion." });
  }
};

// --- 5. அனைத்து பதிவுகளையும் பெறுதல் (Admin Table-க்காக) (GET) ---
exports.getAllCompanyOverviews = async (req, res) => {
  try {
    const overviews = await CompanyOverview.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(overviews);
  } catch (error) {
    console.error("Error fetching all overviews:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching all records." });
  }
};

// --- 6. Front-end-க்கு Active Overview-ஐ மட்டும் பெறுதல் (GET) ---
exports.getPublicCompanyOverview = async (req, res) => {
  try {
    const overview = await CompanyOverview.findAll({
      where: { isActive: true },
      order: [["createdAt", "DESC"]], // கடைசியாகச் சேர்த்த ஆக்டிவ் பதிவைப் பெற
    });

    if (!overview) {
      return res.status(200).json({
        message: "No active overview found",
        data: null,
      });
    }

    return res.status(200).json(overview);
  } catch (error) {
    console.error("Error fetching active company overview:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching public data." });
  }
};
