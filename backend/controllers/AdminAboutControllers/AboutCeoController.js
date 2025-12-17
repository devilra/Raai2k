const { cloudinary } = require("../../config/cloudinaryConfig");
const CeoMessage = require("../../models/AdminAboutModels/AboutCeo");

// 1. அனைத்து Slides-களையும் பெறுதல் (READ)
exports.getCeoMessages = async (req, res) => {
  try {
    const messages = await CeoMessage.findAll({
      order: [["slideOrder", "ASC"]], // வரிசையின்படி Sort செய்
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching slides:", error);
    return res.status(500).json({ message: "Slides fetch failed" });
  }
};

// 2. புதிய Slide-ஐ உருவாக்குதல் (CREATE)
exports.createCeoMessage = async (req, res) => {
  try {
    // Multer-cloudinary மூலம் பதிவேற்றப்பட்ட கோப்பு விவரங்கள்
    if (!req.file) {
      return res.status(400).json({ message: "Ceo Image upload mandatory" });
    }

    const {
      title,
      description,
      //   objectPosition,
      //   fontVariant,
      ceoName,
      ceoPosition,
      slideOrder,
      isActive,
    } = req.body;

    // Multer-Cloudinary-இல் இருந்து பெறப்பட்ட publicId மற்றும் secure_url
    const image = req.file.path; // secure_url
    const publicId = req.file.filename; // public_id

    const newSlide = await CeoMessage.create({
      title,
      description,
      image, // Cloudinary URL
      publicId, // Cloudinary Public ID
      //   objectPosition,
      //   fontVariant,
      ceoName,
      ceoPosition,
      slideOrder: slideOrder || 1, // Order கொடுக்கவில்லை என்றால் 1
      isActive: isActive === "true" || isActive === true,
    });

    return res.status(201).json({
      message: "CEO Message created Successfully",
      data: newSlide,
    });
  } catch (error) {
    console.error("Error creating CEO message", error);
    return res.status(500).json({
      message: "CEO Message upload failed",
      details: error.message, // Sequelize பிழைச் செய்தியைக் காட்டலாம்
      name: error.name, // பிழையின் வகையைக் காட்டலாம் (உதாரணம்: SequelizeValidationError)
    });
  }
};

exports.updateCeoMessage = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const {
    title,
    description,
    // objectPosition,
    // fontVariant,
    ceoName,
    ceoPosition,
    slideOrder,
    isActive,
  } = req.body;

  let newImage = null;

  try {
    const messageRecord = await CeoMessage.findByPk(id);
    if (!messageRecord) {
      return res.status(404).json({ message: "CEO Message Not Found" });
    }

    // **1. பழைய Public ID-ஐ தனியே சேமிக்கவும்**
    const oldPublicId = messageRecord.publicId;

    // படம் புதிதாக பதிவேற்றம் செய்யப்பட்டால் (Optional Image Update)

    if (req.file) {
      // Sequelize hook (beforeUpdate) மூலம் பழைய படம் Cloudinary-இல் இருந்து நீக்கப்படும்.
      newImage = req.file.path;
      messageRecord.image = newImage;
      messageRecord.publicId = req.file.filename; // புதிய Cloudinary Public ID

      // மற்ற விவரங்களைப் புதுப்பிக்க
    }

    // மற்ற விவரங்களைப் புதுப்பிக்க

    messageRecord.title = title || messageRecord.title;
    messageRecord.description = description || messageRecord.description;
    messageRecord.ceoName = ceoName || messageRecord.ceoName;
    messageRecord.ceoPosition = ceoPosition || messageRecord.ceoPosition;
    messageRecord.slideOrder = slideOrder || messageRecord.slideRecord;
    // messageRecord.objectPosition = objectPosition || slide.objectPosition;
    // messageRecord.fontVariant = fontVariant || slide.fontVariant;

    // isActive ஒரு boolean ஆக இருப்பதால், அது body-இல் உள்ளதா எனச் சரிபார்க்கவும்
    if (isActive !== undefined) {
      messageRecord.isActive = isActive;
    }

    await messageRecord.save(); // Sequelize hook இங்கே தூண்டப்பட்டு, பழைய படம் நீக்கப்படும்

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
      message: "CEO Message updated Successfully",
      data: messageRecord,
    });
  } catch (error) {
    console.error("Error updating CEO message:", error);
    // பிழை ஏற்பட்டால், புதிதாக பதிவேற்றப்பட்ட படத்தையும் Cloudinary-இல் இருந்து நீக்கலாம்
    if (req.file && newImage) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    return res.status(500).json({ message: "Slide Updated Error" });
  }
};

// 4. Slide-ஐ நீக்குதல் (DELETE)
exports.deleteCeoMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const messageRecord = await CeoMessage.findByPk(id);
    if (!messageRecord) {
      return res.status(404).json({ message: "CEO Message Not Found" });
    }

    // Sequelize hook (beforeDestroy) மூலம் Cloudinary படம் நீக்கப்படும்

    await messageRecord.destroy();
    return res
      .status(200)
      .json({ message: "CEO Message Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting CEO message:", error);
    return res.status(500).json({ message: "CEO Message Deleted Error" });
  }
};
