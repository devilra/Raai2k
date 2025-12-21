const CaseStudy = require("../../models/AdminServiceModels/CaseStudy");

// --- 1. புதிய Case Study-ஐ உருவாக்குதல் (POST) ---
exports.createCaseStudy = async (req, res) => {
  try {
    const { pageTitle, heading, points, order, isActive } = req.body;

    // அத்தியாவசியமான புலங்கள் உள்ளனவா எனச் சரிபார்த்தல்
    if (!heading || !points) {
      return res.status(400).json({
        message: "Heading and Points are required.",
      });
    }

    const newCaseStudy = await CaseStudy.create({
      pageTitle,
      heading,
      points, // இது JSON Array-ஆகச் சேமிக்கப்படும் (எ.கா: ["Point 1", "Point 2"])
      order: order || 1,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      message: "Case Study created successfully.",
      data: newCaseStudy,
    });
  } catch (error) {
    console.error("Error creating Case Study:", error);
    return res.status(500).json({ message: "Server error during creation." });
  }
};

// --- 2. ID மூலம் ஒன்றைப் பெறுதல் (GET) ---
exports.getCaseStudyById = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByPk(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({ message: "Case Study not found." });
    }

    return res.status(200).json(caseStudy);
  } catch (error) {
    console.error("Error fetching Case Study by ID:", error);
    return res.status(500).json({ message: "Server error fetching record." });
  }
};

// --- 3. தரவைப் புதுப்பித்தல் (PUT) ---
exports.updateCaseStudy = async (req, res) => {
  try {
    const { pageTitle, heading, points, order, isActive } = req.body;

    const caseStudy = await CaseStudy.findByPk(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({ message: "Case Study not found." });
    }

    // தரவுகளைப் புதுப்பித்தல்
    caseStudy.pageTitle =
      pageTitle !== undefined ? pageTitle : caseStudy.pageTitle;
    caseStudy.heading = heading !== undefined ? heading : caseStudy.heading;
    caseStudy.points = points !== undefined ? points : caseStudy.points;
    caseStudy.order = order !== undefined ? order : caseStudy.order;
    caseStudy.isActive = isActive !== undefined ? isActive : caseStudy.isActive;

    await caseStudy.save();

    return res.status(200).json({
      message: "Case Study updated successfully.",
      data: caseStudy,
    });
  } catch (error) {
    console.error("Error updating Case Study:", error);
    return res.status(500).json({ message: "Server error during update." });
  }
};

// --- 4. தரவை நீக்குதல் (DELETE) ---
exports.deleteCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByPk(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({ message: "Case Study not found." });
    }

    await caseStudy.destroy();

    return res
      .status(200)
      .json({ message: "Case Study deleted successfully." });
  } catch (error) {
    console.error("Error deleting Case Study:", error);
    return res.status(500).json({ message: "Server error during deletion." });
  }
};

// --- 5. அனைத்து பதிவுகளையும் பெறுதல் (Admin Table-க்காக) ---
exports.getAllCaseStudies = async (req, res) => {
  try {
    const studies = await CaseStudy.findAll({
      order: [["order", "ASC"]],
    });

    return res.status(200).json(studies);
  } catch (error) {
    console.error("Error fetching all Case Studies:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching all records." });
  }
};

// --- 6. Front-end-க்கு Active Case Studies மட்டும் பெறுதல் ---
exports.getActiveCaseStudies = async (req, res) => {
  try {
    const studies = await CaseStudy.findAll({
      where: { isActive: true },
      order: [["order", "ASC"]],
    });

    return res.status(200).json(studies);
  } catch (error) {
    console.error("Error fetching active Case Studies:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching public data." });
  }
};
