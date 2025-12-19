const { cloudinary } = require("../../config/cloudinaryConfig");
const GlobalLeadership = require("../../models/AdminAboutModels/GlobalLeadership");

// 1. அனைத்து Leadership Members-களையும் பெறுதல் (READ)
exports.getGlobalLeaders = async (req, res) => {
  try {
    const leaders = await GlobalLeadership.findAll({
      order: [["slideOrder", "ASC"]], // வரிசையின்படி Sort செய்
    });

    return res.status(200).json(leaders);
  } catch (error) {
    console.error("Error fetching leaders:", error);
    return res.status(500).json({ message: "Leaders fetch failed" });
  }
};

// 5. Frontend-க்காக Active நிலையில் உள்ள Leaders-ஐ மட்டும் பெறுதல் (PUBLIC READ)
exports.getActiveGlobalLeaders = async (req, res) => {
  try {
    const activeLeaders = await GlobalLeadership.findAll({
      where: {
        isActive: true, // Active ஆக இருப்பவை மட்டும்
      },
      order: [["slideOrder", "ASC"]], // வரிசைப்படி
    });

    return res.status(200).json(activeLeaders);
  } catch (error) {
    console.error("Error fetching active leaders:", error);
    return res.status(500).json({ message: "Failed to fetch active leaders" });
  }
};

// 2. புதிய Leader-ஐ உருவாக்குதல் (CREATE)
exports.createGlobalLeader = async (req, res) => {
  console.log(req.body);
  try {
    // Cloudinary மூலம் படம் பதிவேற்றப்பட்டிருக்க வேண்டும்
    if (!req.file) {
      return res.status(400).json({ message: "Leader Image upload mandatory" });
    }

    const { mainTitle, role, subTitle, description, slideOrder, isActive } =
      req.body;

    // Cloudinary-இல் இருந்து பெறப்பட்ட URL மற்றும் Public ID
    const image = req.file.path;
    const publicId = req.file.filename;

    const newLeader = await GlobalLeadership.create({
      mainTitle: mainTitle || "Global Leadership", // Default title if not provided
      role,
      subTitle,
      description,
      image,
      publicId,
      slideOrder: slideOrder || 1,
      isActive: isActive === "true" || isActive === true,
    });

    return res.status(201).json({
      message: "Global Leader created Successfully",
      data: newLeader,
    });
  } catch (error) {
    console.error("Error creating Global Leader:", error);
    return res.status(500).json({
      message: "Global Leader upload failed",
      details: error.message,
    });
  }
};

// 3. விவரங்களைப் புதுப்பித்தல் (UPDATE)
exports.updateGlobalLeader = async (req, res) => {
  const { id } = req.params;
  const { mainTitle, role, subTitle, description, slideOrder, isActive } =
    req.body;

  let newImage = null;

  try {
    const leaderRecord = await GlobalLeadership.findByPk(id);
    if (!leaderRecord) {
      return res.status(404).json({ message: "Leader Not Found" });
    }

    // பழைய Public ID-ஐ வைத்துக்கொள்ளவும் (Update வெற்றிகரமாக முடிந்தால் நீக்க)
    const oldPublicId = leaderRecord.publicId;

    // புதிய படம் இருந்தால்
    if (req.file) {
      newImage = req.file.path;
      leaderRecord.image = newImage;
      leaderRecord.publicId = req.file.filename;
    }

    // இதர விவரங்களைப் புதுப்பிக்க
    leaderRecord.mainTitle = mainTitle || leaderRecord.mainTitle;
    leaderRecord.role = role || leaderRecord.role;
    leaderRecord.subTitle = subTitle || leaderRecord.subTitle;
    leaderRecord.description = description || leaderRecord.description;
    leaderRecord.slideOrder = slideOrder || leaderRecord.slideOrder;

    if (isActive !== undefined) {
      leaderRecord.isActive = isActive === "true" || isActive === true;
    }

    // Save செய்யும்போது ஸ்கீமாவில் உள்ள beforeUpdate Hook தானாக வேலை செய்யும்
    await leaderRecord.save();

    return res.status(200).json({
      message: "Global Leader updated Successfully",
      data: leaderRecord,
    });
  } catch (error) {
    console.error("Error updating Global Leader:", error);

    // Update தோல்வியடைந்தால், இப்போது பதிவேற்றிய புதிய படத்தை நீக்கவும்
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }

    return res.status(500).json({ message: "Leader Update Error" });
  }
};

// 4. Leader-ஐ நீக்குதல் (DELETE)
exports.deleteGlobalLeader = async (req, res) => {
  const { id } = req.params;

  try {
    const leaderRecord = await GlobalLeadership.findByPk(id);
    if (!leaderRecord) {
      return res.status(404).json({ message: "Leader Not Found" });
    }

    // destroy() செய்யும் போது ஸ்கீமாவில் உள்ள beforeDestroy Hook Cloudinary படத்தை நீக்கிவிடும்
    await leaderRecord.destroy();

    return res.status(200).json({ message: "Leader Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting leader:", error);
    return res.status(500).json({ message: "Leader Deletion Error" });
  }
};
