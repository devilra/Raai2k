const { cloudinary } = require("../../config/cloudinaryConfig");
const WhyChooseUs = require("../../models/AdminHomeModels/WhyChooseUs");

// 1. அனைத்து பதிவுகளையும் பெறுதல் (ADMIN READ)
exports.getAllWhyChooseItems = async (req, res) => {
  try {
    const list = await WhyChooseUs.findAll({
      order: [["order", "ASC"]],
    });
    return res.status(200).json(list);
  } catch (error) {
    console.error("Error fetching WhyChooseUs items:", error);
    return res.status(500).json({ message: "Data fetch failed" });
  }
};

// 2. Active நிலையில் உள்ளவற்றை மட்டும் பெறுதல் (PUBLIC READ)
exports.getActiveWhyChooseItems = async (req, res) => {
  try {
    const activeItems = await WhyChooseUs.findAll({
      where: { isActive: true },
      order: [["order", "ASC"]],
    });
    return res.status(200).json(activeItems);
  } catch (error) {
    console.error("Error fetching active items:", error);
    return res.status(500).json({ message: "Failed to fetch active data" });
  }
};

// 3. புதிய பதிவை உருவாக்குதல் (CREATE)
exports.createWhyChooseItem = async (req, res) => {
  try {
    // if (!req.file) {
    //   return res
    //     .status(400)
    //     .json({ message: "Feature Image upload is mandatory" });
    // }

    // Image optional handling
    let image = null;
    let publicId = null;

    const { pageTitle, title, description, order, isActive } = req.body;

    if (req.file) {
      image = req.file.path;
      publicId = req.file.filename;
    }

    const newItem = await WhyChooseUs.create({
      pageTitle: pageTitle || "Why Choose raai2k",
      title,
      description,
      image,
      publicId,
      order: order || 1,
      isActive: isActive === "true" || isActive === true,
    });

    return res.status(201).json({
      message: "Why Choose Us item created successfully",
      data: newItem,
    });
  } catch (error) {
    console.error("Error creating item:", error);
    return res.status(500).json({
      message: "Creation failed",
      details: error.message,
    });
  }
};

// 4. பதிவை புதுப்பித்தல் (UPDATE)
exports.updateWhyChooseItem = async (req, res) => {
  const { id } = req.params;
  const { pageTitle, title, description, order, isActive } = req.body;

  try {
    const record = await WhyChooseUs.findByPk(id);
    if (!record) {
      return res.status(404).json({ message: "Record Not Found" });
    }

    // புதிய இமேஜ் அப்லோட் செய்யப்பட்டால்
    if (req.file) {
      record.image = req.file.path;
      record.publicId = req.file.filename;
    }

    record.pageTitle = pageTitle || record.pageTitle;
    record.title = title || record.title;
    record.description = description || record.description;
    record.order = order || record.order;

    if (isActive !== undefined) {
      record.isActive = isActive === "true" || isActive === true;
    }

    await record.save();

    return res.status(200).json({
      message: "Updated successfully",
      data: record,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    // எரர் ஏற்பட்டால் அப்லோட் ஆன புதிய இமேஜை Cloudinary-ல் இருந்து நீக்கவும்
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    return res.status(500).json({ message: "Update error" });
  }
};

// 5. பதிவை நீக்குதல் (DELETE)
exports.deleteWhyChooseItem = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await WhyChooseUs.findByPk(id);
    if (!record) {
      return res.status(404).json({ message: "Record Not Found" });
    }

    // Model-ல் உள்ள beforeDestroy ஹூக் மூலமாக Cloudinary இமேஜ் தானாக நீக்கப்படும்
    await record.destroy();

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ message: "Deletion error" });
  }
};
