const { cloudinary } = require("../../config/cloudinaryConfig");
const ClientTestimonial = require("../../models/AdminHomeModels/ClientTestimonial");

// 1. அனைத்து டெஸ்டிமோனியல்களையும் பெறுதல் (ADMIN READ)
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonialList = await ClientTestimonial.findAll({
      order: [["slideOrder", "ASC"]],
    });
    return res.status(200).json(testimonialList);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return res.status(500).json({ message: "Testimonials fetch failed" });
  }
};

// 2. Active நிலையில் உள்ளவற்றை மட்டும் பெறுதல் (PUBLIC READ)
exports.getActiveTestimonials = async (req, res) => {
  try {
    const activeTestimonials = await ClientTestimonial.findAll({
      where: { isActive: true },
      order: [["slideOrder", "ASC"]],
    });
    return res.status(200).json(activeTestimonials);
  } catch (error) {
    console.error("Error fetching active testimonials:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch active testimonials" });
  }
};

// 3. புதிய டெஸ்டிமோனியல் உருவாக்குதல் (CREATE)
exports.createTestimonial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Client Image upload mandatory" });
    }

    const { quote, name, position, slideOrder, isActive } = req.body;

    const image = req.file.path;
    const publicId = req.file.filename;

    const newTestimonial = await ClientTestimonial.create({
      quote,
      name,
      position,
      image,
      publicId,
      slideOrder: slideOrder || 1,
      isActive: isActive === "true" || isActive === true,
    });

    return res.status(201).json({
      message: "Testimonial created Successfully",
      data: newTestimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return res.status(500).json({
      message: "Testimonial creation failed",
      details: error.message,
    });
  }
};

// 4. டெஸ்டிமோனியல் புதுப்பித்தல் (UPDATE)
exports.updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { quote, name, position, slideOrder, isActive } = req.body;

  try {
    const testimonialRecord = await ClientTestimonial.findByPk(id);
    if (!testimonialRecord) {
      return res.status(404).json({ message: "Testimonial Not Found" });
    }

    if (req.file) {
      testimonialRecord.image = req.file.path;
      testimonialRecord.publicId = req.file.filename;
    }

    testimonialRecord.quote = quote || testimonialRecord.quote;
    testimonialRecord.name = name || testimonialRecord.name;
    testimonialRecord.position = position || testimonialRecord.position;
    testimonialRecord.slideOrder = slideOrder || testimonialRecord.slideOrder;

    if (isActive !== undefined) {
      testimonialRecord.isActive = isActive === "true" || isActive === true;
    }

    await testimonialRecord.save();

    return res.status(200).json({
      message: "Testimonial updated Successfully",
      data: testimonialRecord,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    return res.status(500).json({ message: "Testimonial Update Error" });
  }
};

// 5. டெஸ்டிமோனியல் நீக்குதல் (DELETE)
exports.deleteTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    const testimonialRecord = await ClientTestimonial.findByPk(id);
    if (!testimonialRecord) {
      return res.status(404).json({ message: "Testimonial Not Found" });
    }

    await testimonialRecord.destroy();
    return res
      .status(200)
      .json({ message: "Testimonial Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return res.status(500).json({ message: "Testimonial Deletion Error" });
  }
};
