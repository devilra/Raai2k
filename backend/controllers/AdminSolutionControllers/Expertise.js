const { cloudinary } = require("../../config/cloudinaryConfig");
const Expertise = require("../../models/AdminSolutionModels/Expertise");

// 1. அனைத்து Slides-களையும் பெறுதல் (READ)
exports.getExpertise = async (req, res) => {
  try {
    const slides = await Expertise.findAll({
      order: [["slideOrder", "ASC"]], // வரிசையின்படி Sort செய்
    });

    return res.status(200).json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    return res.status(500).json({ message: "Slides fetch failed" });
  }
};

// 2. புதிய Slide-ஐ உருவாக்குதல் (CREATE)
exports.createExpertise = async (req, res) => {
  console.log(req.file);
  try {
    // Multer-cloudinary மூலம் பதிவேற்றப்பட்ட கோப்பு விவரங்கள்
    if (!req.file) {
      return res.status(400).json({ message: "Image upload mandatory" });
    }

    const { title, description, objectPosition, fontVariant, slideOrder } =
      req.body;

    // Multer-Cloudinary-இல் இருந்து பெறப்பட்ட publicId மற்றும் secure_url
    const image = req.file.path; // secure_url
    const publicId = req.file.filename; // public_id

    const newSlide = await Expertise.create({
      title,
      description,
      image, // Cloudinary URL
      publicId, // Cloudinary Public ID
      objectPosition,
      fontVariant,
      slideOrder: slideOrder || 1, // Order கொடுக்கவில்லை என்றால் 1
    });

    return res.status(201).json({
      message: "Slide created Successfull",
      slide: newSlide,
    });
  } catch (error) {
    console.error("Error creating slide:", error.message);
    return res.status(500).json({
      message: "Slide upload failed. See 'details' for more info.",
      details: error.message, // Sequelize பிழைச் செய்தியைக் காட்டலாம்
      name: error.name, // பிழையின் வகையைக் காட்டலாம் (உதாரணம்: SequelizeValidationError)
    });
  }
};

exports.updateExpertise = async (req, res) => {
  //console.log(req.body);
  const { id } = req.params;
  const {
    title,
    description,
    objectPosition,
    fontVariant,
    slideOrder,
    isActive,
  } = req.body;

  let newImage = null;

  try {
    const slide = await Expertise.findByPk(id);
    if (!slide) {
      return res.status(404).json({ message: "Slide Not Found" });
    }

    // **1. பழைய Public ID-ஐ தனியே சேமிக்கவும்**
    const oldPublicId = slide.publicId;

    // படம் புதிதாக பதிவேற்றம் செய்யப்பட்டால் (Optional Image Update)

    if (req.file) {
      // Sequelize hook (beforeUpdate) மூலம் பழைய படம் Cloudinary-இல் இருந்து நீக்கப்படும்.
      newImage = req.file.path;
      slide.image = newImage;
      slide.publicId = req.file.filename; // புதிய Cloudinary Public ID

      // மற்ற விவரங்களைப் புதுப்பிக்க
    }

    // மற்ற விவரங்களைப் புதுப்பிக்க
    slide.title = title || slide.title;
    slide.description = description || slide.description;
    slide.objectPosition = objectPosition || slide.objectPosition;
    slide.fontVariant = fontVariant || slide.fontVariant;
    slide.slideOrder = slideOrder || slide.slideOrder;

    // isActive ஒரு boolean ஆக இருப்பதால், அது body-இல் உள்ளதா எனச் சரிபார்க்கவும்
    if (isActive !== undefined) {
      slide.isActive = isActive;
    }

    await slide.save(); // Sequelize hook இங்கே தூண்டப்பட்டு, பழைய படம் நீக்கப்படும்

    // **3. Database Update வெற்றிகரமாக முடிந்த பிறகு, பழைய படத்தை நீக்கவும்**
    if (req.file && oldPublicId) {
      console.log(`Attempting to delete OLD Cloudinary image: ${oldPublicId}`);

      // 🚨 இந்த இடத்தில் Cloudinary credentials மற்றும் destroy function சரியாக இருக்கிறதா எனச் சரிபார்க்கவும்
      const deleteResult = await cloudinary.uploader.destroy(oldPublicId);

      console.log("Cloudinary Deletion Result:", deleteResult); // 👈 முக்கியமான log

      if (deleteResult.result === "ok") {
        console.log(`Old image ${oldPublicId} deleted successfully.`);
      } else {
        console.warn(
          `Cloudinary deletion failed for ${oldPublicId}. Result: ${deleteResult.result}`
        );
      }
    }

    return res.status(200).json({
      message: "Slide updated Successfully",
      slide,
    });
  } catch (error) {
    console.error("Error updating slide:", error);
    // பிழை ஏற்பட்டால், புதிதாக பதிவேற்றப்பட்ட படத்தையும் Cloudinary-இல் இருந்து நீக்கலாம்
    if (req.file && newImage) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    return res.status(500).json({ message: "Slide Updated Error" });
  }
};

// 4. Slide-ஐ நீக்குதல் (DELETE)
exports.deleteExpertise = async (req, res) => {
  const { id } = req.params;

  try {
    const slide = await Expertise.findByPk(id);
    if (!slide) {
      return res.status(404).json({ message: "Slide Not Found" });
    }

    // Sequelize hook (beforeDestroy) மூலம் Cloudinary படம் நீக்கப்படும்

    await slide.destroy();
    return res.status(200).json({ message: "Slide Deleted Successfull" });
  } catch (error) {
    console.error("Error deleting slide:", error);
    return res.status(500).json({ message: "Slide Deleted Error" });
  }
};
