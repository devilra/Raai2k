const { cloudinary } = require("../../config/cloudinaryConfig");
const LatestNews = require("../../models/AdminHomeModels/LatestNews");

// 1. அனைத்து செய்திகளையும் பெறுதல் (ADMIN READ)
exports.getAllNews = async (req, res) => {
  try {
    const newsList = await LatestNews.findAll({
      order: [["slideOrder", "ASC"]], // வரிசைப்படி Sort செய்
    });

    return res.status(200).json(newsList);
  } catch (error) {
    console.error("Error fetching news:", error);
    return res.status(500).json({ message: "News fetch failed" });
  }
};

// 2. Active நிலையில் உள்ள செய்திகளை மட்டும் பெறுதல் (PUBLIC READ)
exports.getActiveNews = async (req, res) => {
  try {
    const activeNews = await LatestNews.findAll({
      where: {
        isActive: true, // Active ஆக இருப்பவை மட்டும்
      },
      order: [["slideOrder", "ASC"]],
    });

    return res.status(200).json(activeNews);
  } catch (error) {
    console.error("Error fetching active news:", error);
    return res.status(500).json({ message: "Failed to fetch active news" });
  }
};

// 3. புதிய செய்தியை உருவாக்குதல் (CREATE)
exports.createNews = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "News Image upload mandatory" });
    }

    // 🚩 'link' இங்கே சேர்க்கப்பட்டுள்ளது
    const {
      pageTitle,
      newsTitle,
      byName,
      description,
      link,
      slideOrder,
      isActive,
    } = req.body;

    const image = req.file.path;
    const publicId = req.file.filename;

    const newNews = await LatestNews.create({
      pageTitle: pageTitle || "Latest News",
      newsTitle,
      byName,
      description,
      link, // 🚩 Database-ல் சேமிக்கப்படும்
      image,
      publicId,
      slideOrder: slideOrder || 1,
      isActive: isActive === "true" || isActive === true,
    });

    return res.status(201).json({
      message: "News created Successfully",
      data: newNews,
    });
  } catch (error) {
    console.error("Error creating news:", error);
    return res
      .status(500)
      .json({ message: "News creation failed", details: error.message });
  }
};

// 4. செய்தியைப் புதுப்பித்தல் (UPDATE)
exports.updateNews = async (req, res) => {
  const { id } = req.params;
  // 🚩 'link' இங்கே சேர்க்கப்பட்டுள்ளது
  const {
    pageTitle,
    newsTitle,
    byName,
    description,
    link,
    slideOrder,
    isActive,
  } = req.body;

  try {
    const newsRecord = await LatestNews.findByPk(id);
    if (!newsRecord) {
      return res.status(404).json({ message: "News Not Found" });
    }

    if (req.file) {
      newsRecord.image = req.file.path;
      newsRecord.publicId = req.file.filename;
    }

    // இதர விவரங்களைப் புதுப்பிக்க
    newsRecord.pageTitle = pageTitle || newsRecord.pageTitle;
    newsRecord.newsTitle = newsTitle || newsRecord.newsTitle;
    newsRecord.byName = byName || newsRecord.byName;
    newsRecord.description = description || newsRecord.description;
    newsRecord.link = link || newsRecord.link; // 🚩 'link' அப்டேட் செய்யப்படுகிறது
    newsRecord.slideOrder = slideOrder || newsRecord.slideOrder;

    if (isActive !== undefined) {
      newsRecord.isActive = isActive === "true" || isActive === true;
    }

    await newsRecord.save();

    return res.status(200).json({
      message: "News updated Successfully",
      data: newsRecord,
    });
  } catch (error) {
    console.error("Error updating news:", error);
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    return res.status(500).json({ message: "News Update Error" });
  }
};

// 5. செய்தியை நீக்குதல் (DELETE)
exports.deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const newsRecord = await LatestNews.findByPk(id);
    if (!newsRecord) {
      return res.status(404).json({ message: "News Not Found" });
    }

    // Model Hook Cloudinary-ல் உள்ள படத்தை தானாக நீக்கிவிடும்
    await newsRecord.destroy();

    return res.status(200).json({ message: "News Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    return res.status(500).json({ message: "News Deletion Error" });
  }
};
