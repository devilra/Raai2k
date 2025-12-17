// Solution Banner Controller-க்கு (பொதுவாக) ஒரே ஒரு entry மட்டுமே இருக்கும் என்பதால்,
// List-க்கு பதிலாக ஒற்றை பேனர் அல்லது அனைத்து பேனர்களையும் பெறுவதற்கான methods உருவாக்கப்பட்டுள்ளது.

const { cloudinary } = require("../../config/cloudinaryConfig");
const SolutionBanner = require("../../models/AdminSolutionModels/SolutionBanner");

// 1. அனைத்து Solution Banner-களையும் பெறுதல் (READ All - List Mode)
// இது Admin UI-இல் List-ஐக் காட்டப் பயன்படும்.

exports.getSolutionBanners = async (req, res) => {
  try {
    const banners = await SolutionBanner.findAll({
      // Solution Banner-க்கு order field தேவையில்லை.
      // இருப்பினும், பல entries இருந்தால், createdAt மூலம் Sort செய்யலாம்
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json(banners);
  } catch (error) {
    console.error("Error fetching solution banners:", error);
    return res.status(500).json({ message: "Solution Banners fetch failed" });
  }
};

// =======================================================
// ✅ 5. UI-க்கு (Front-end) ஆக்டிவாக உள்ள பேனரைப் பெறுதல் (READ Active)
// =======================================================

exports.getPublishedSolutionBanner = async (req, res) => {
  try {
    // 💡 மாற்றப்பட்ட வரி: findOne-க்கு பதிலாக findAll பயன்படுத்தப்பட்டுள்ளது
    const publishedBanners = await SolutionBanner.findAll({
      where: {
        isActive: true, // Active-இல் இருக்கும் பேனர்கள் மட்டும்
      },
      // பல Active பேனர்கள் இருந்தால், அவற்றை ஏதேனும் ஒரு வரிசையில் (உதாரணமாக, உருவாக்கப்பட்ட தேதியின்படி) வரிசைப்படுத்தலாம்.
      order: [
        ["createdAt", "ASC"], // உருவாக்க தேதிப்படி வரிசைப்படுத்துக
      ],
    });

    // result-ஐப் பரிசோதிக்கவும். findAll() காலியாக இருந்தால் [] என்ற காலியான Array-ஐத் திரும்ப அனுப்பும்.
    if (publishedBanners.length === 0) {
      // Active பேனர்கள் எதுவும் இல்லை என்றால், காலியான Array-ஐத் திரும்ப அனுப்புகிறோம்
      return res.status(200).json({
        message: "No active Solution Banner found.",
        content: [], // காலியான Array-ஐ அனுப்பவும்
      });
    }

    // Active-இல் இருக்கும் அனைத்து பேனர்களும் Array-ஆகத் திரும்ப அனுப்பப்படுகின்றன
    return res.status(200).json(publishedBanners); // Array-ஆக response அனுப்பப்படும்
  } catch (error) {
    console.error("Error fetching published solution banners:", error);
    return res
      .status(500)
      .json({ message: "Published Solution Banners fetch failed" });
  }
};

// 2. புதிய Solution Banner-ஐ உருவாக்குதல் (CREATE)
exports.createSolutionBanner = async (req, res) => {
  console.log(req.body);
  try {
    // Image Optional என்பதால், req.file இருக்கிறதா எனச் சரிபார்ப்பது கட்டாயமில்லை.
    const { title, description, fontVariant, isActive } = req.body;

    // அடிப்படை validation
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description are mandatory." });
    }

    let image = null;
    let publicId = null;

    // படம் பதிவேற்றப்பட்டால் அதன் விவரங்களைப் பெறவும்
    if (req.file) {
      image = req.file.path; // secure_url
      publicId = req.file.filename; // public_id
    }

    const newBanner = await SolutionBanner.create({
      title,
      description,
      image, // Cloudinary URL (null ஆக இருக்கலாம்)
      publicId, // Cloudinary Public ID (null ஆக இருக்கலாம்)
      fontVariant: fontVariant || "hero", // Default மதிப்பு
      // isActive Boolean-ஐ சரியாக கையாள
      isActive: isActive === "true" || isActive === true,
    });

    return res.status(201).json({
      message: "Solution Banner created successfully.",
      content: newBanner,
    });
  } catch (error) {
    console.error("Error creating solution banner:", error);
    return res.status(500).json({
      message: "Banner creation failed. See 'details' for more info.",
      details: error.message,
      name: error.name,
    });
  }
};

// 3. Solution Banner-ஐப் புதுப்பித்தல் (UPDATE)
exports.updateSolutionBanner = async (req, res) => {
  const { id } = req.params;
  const { title, description, fontVariant, isActive } = req.body;

  let newImage = null;

  try {
    const banner = await SolutionBanner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ message: "Solution Banner not found" });
    }

    // **1. பழைய Public ID-ஐ தனியே சேமிக்கவும்**
    const oldPublicId = banner.publicId;

    // **2. படம் புதிதாக பதிவேற்றம் செய்யப்பட்டால்**
    if (req.file) {
      // Sequelize hook (beforeUpdate)-ஐ நம்பி, database-இல் உள்ள oldPublicId நீக்கப்படும்.
      newImage = req.file.path;
      banner.image = newImage;
      banner.publicId = req.file.filename; // புதிய Cloudinary Public ID
    }
    // 💡 குறிப்பு: Front-end-இல் image file-ஐ அனுப்பாமல், image URL-ஐ மட்டும்
    // அனுப்பினால் image field மாற்றப்படாது.

    // 3. மற்ற விவரங்களைப் புதுப்பிக்க
    banner.title = title || banner.title;
    banner.description = description || banner.description;
    banner.fontVariant = fontVariant || banner.fontVariant;

    // isActive ஒரு boolean ஆக இருப்பதால், அது body-இல் உள்ளதா எனச் சரிபார்க்கவும்
    if (isActive !== undefined) {
      // String 'true' or 'false' வந்தாலும், அதை boolean-ஆக மாற்றி சேமிக்கிறது.
      banner.isActive = isActive === "true" || isActive === true;
    }

    await banner.save(); // Sequelize hook இங்கே தூண்டப்பட்டு, பழைய படம் நீக்கப்படும்

    // **4. Database Update வெற்றிகரமாக முடிந்த பிறகு, பழைய படத்தை நீக்கவும்**
    // Sequelize hook-ஐ மட்டுமே நம்பி, இங்கிருக்கும் நீக்கும் லாஜிக்கை நீக்கலாம்
    // அல்லது உறுதிப்படுத்த இங்கே மீண்டும் நீக்கலாம்.
    // உங்கள் CarouselSlide controller-இல் Hook-ம், இங்கே manual deletion-ம் இருப்பதால்,
    // நான் Hook-ஐ நம்பி இந்த manual deletion block-ஐ நீக்குகிறேன்.
    // நீங்கள் Hook-ஐ மட்டுமே பயன்படுத்த விரும்பினால், அதை உறுதிப்படுத்தவும்.

    /* if (req.file && oldPublicId) {
             await cloudinary.uploader.destroy(oldPublicId);
        }
        */

    return res.status(200).json({
      message: "Solution Banner updated successfully",
      content: banner,
    });
  } catch (error) {
    console.error("Error updating solution banner:", error);

    // பிழை ஏற்பட்டால், புதிதாக பதிவேற்றப்பட்ட படத்தையும் Cloudinary-இல் இருந்து நீக்கலாம்
    if (req.file && newImage) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    return res.status(500).json({ message: "Solution Banner Update Error" });
  }
};

// 4. Solution Banner-ஐ நீக்குதல் (DELETE)
exports.deleteSolutionBanner = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await SolutionBanner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ message: "Solution Banner not found" });
    }

    // Sequelize hook (beforeDestroy) மூலம் Cloudinary படம் நீக்கப்படும்
    await banner.destroy();

    return res
      .status(200)
      .json({ message: "Solution Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting solution banner:", error);
    return res.status(500).json({ message: "Solution Banner deleted Error" });
  }
};
