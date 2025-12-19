const AboutOurApproach = require("../../models/AdminAboutModels/AboutOurApproach");

// --- 1. புதிய Approach-ஐ உருவாக்குதல் (POST) ---
exports.createOurApproach = async (req, res) => {
  try {
    const { pageTitle, approachCards, footerDescription, isActive } = req.body;

    // அத்தியாவசியமான புலங்கள் உள்ளனவா எனச் சரிபார்த்தல்
    if (!approachCards || !footerDescription) {
      return res.status(400).json({
        message: "Approach Cards and Footer Description are required.",
      });
    }

    const newApproach = await AboutOurApproach.create({
      pageTitle,
      approachCards, // இது JSON Array-ஆகச் சேமிக்கப்படும் ([{title, points}, ...])
      footerDescription,
      isActive,
    });

    return res.status(201).json({
      message: "Our Approach content created successfully.",
      data: newApproach,
    });
  } catch (error) {
    console.error("Error creating Our Approach:", error);
    return res.status(500).json({ message: "Server error during creation." });
  }
};

// --- 2. ID மூலம் ஒன்றைப் பெறுதல் (GET) ---
exports.getOurApproachById = async (req, res) => {
  try {
    const approach = await AboutOurApproach.findByPk(req.params.id);

    if (!approach) {
      return res.status(404).json({ message: "Approach content not found." });
    }

    return res.status(200).json(approach);
  } catch (error) {
    console.error("Error fetching Our Approach by ID:", error);
    return res.status(500).json({ message: "Server error fetching record." });
  }
};

// --- 3. தரவைப் புதுப்பித்தல் (PUT) ---
exports.updateOurApproach = async (req, res) => {
  try {
    const { pageTitle, approachCards, footerDescription, isActive } = req.body;

    const approach = await AboutOurApproach.findByPk(req.params.id);

    if (!approach) {
      return res.status(404).json({ message: "Approach content not found." });
    }

    // தரவுகளைப் புதுப்பித்தல் (இருந்தால் மட்டும் புதுப்பிக்கும்)
    approach.pageTitle =
      pageTitle !== undefined ? pageTitle : approach.pageTitle;
    approach.approachCards =
      approachCards !== undefined ? approachCards : approach.approachCards;
    approach.footerDescription =
      footerDescription !== undefined
        ? footerDescription
        : approach.footerDescription;
    approach.isActive = isActive !== undefined ? isActive : approach.isActive;

    await approach.save();

    return res.status(200).json({
      message: "Our Approach updated successfully.",
      data: approach,
    });
  } catch (error) {
    console.error("Error updating Our Approach:", error);
    return res.status(500).json({ message: "Server error during update." });
  }
};

// --- 4. தரவை நீக்குதல் (DELETE) ---
exports.deleteOurApproach = async (req, res) => {
  try {
    const approach = await AboutOurApproach.findByPk(req.params.id);

    if (!approach) {
      return res.status(404).json({ message: "Approach content not found." });
    }

    await approach.destroy();

    return res
      .status(200)
      .json({ message: "Our Approach deleted successfully." });
  } catch (error) {
    console.error("Error deleting Our Approach:", error);
    return res.status(500).json({ message: "Server error during deletion." });
  }
};

// --- 5. அனைத்து பதிவுகளையும் பெறுதல் (Admin Table-க்காக) (GET) ---
exports.getAllOurApproaches = async (req, res) => {
  try {
    const approaches = await AboutOurApproach.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(approaches);
  } catch (error) {
    console.error("Error fetching all approaches:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching all records." });
  }
};

// --- 6. Front-end-க்கு Active Approach-ஐ மட்டும் பெறுதல் (GET) ---
exports.getPublicOurApproach = async (req, res) => {
  try {
    const approach = await AboutOurApproach.findOne({
      where: { isActive: true },
      order: [["createdAt", "DESC"]], // சமீபத்திய ஆக்டிவ் பதிவை மட்டும் எடுக்க
    });

    if (!approach) {
      return res.status(200).json({
        message: "No active approach content found",
        data: null,
      });
    }

    return res.status(200).json(approach);
  } catch (error) {
    console.error("Error fetching active approach content:", error);
    return res
      .status(500)
      .json({ message: "Server error fetching public data." });
  }
};
