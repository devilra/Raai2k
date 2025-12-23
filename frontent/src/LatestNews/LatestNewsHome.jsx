import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const newsData = [
  {
    id: 1,
    title: "Tax impacts of lease mean accounting change",
    author: "Paul O'Sullivan",
    desc: "HMRC released a consultation document to flag some potential tax impacts that a forthcoming change...",
    img: "/latest/l1.jpg",
    link: "https://www.finextra.com/newsarticle/47027/abu-dhabi-launches-fintech-centre-with-focus-on-digital-assets",
  },
  {
    id: 2,
    title: "What brexit means for data protection law",
    author: "Enrico Ambrosi",
    desc: "Assuming that the referendum is not ignored completely, there are two possible futures for the UK...",
    img: "/latest/l2.jpg",
    link: "https://techafricanews.com/2025/12/09/abu-dhabi-launches-fida-cluster-to-advance-fintech-insurance-digital-and-alternative-assets/",
  },
  {
    id: 3,
    title: "The growing menace of social engineering fraud",
    author: "Robson",
    desc: "Social engineering involves the collection of information from various sources about a target...",
    img: "/latest/l3.jpg",
    link: "https://ibsintelligence.com/ibsi-news/emirates-gold-public-gold-launches-fintech-powered-gold-atms/",
  },

  // ⭐ ADDED NEW ARTICLE ⭐
  {
    id: 4,
    title: "How AI is transforming financial services in 2025",
    author: "Sarah Mitchell",
    desc: "AI-driven automation and predictive analytics are reshaping lending, compliance, and customer experience in the fintech world...",
    img: "/latest/l4.jpg",
    link: "https://fintechnews.sg/123265/videos/the-next-chapter-in-payments-safety-experience-speed-hasan-khan-trust-bank/",
  },

  // ⭐ EXTRA ARTICLE 1 ⭐
  {
    id: 5,
    title: "UPI Cross-Border Payments: What Businesses Need to Know",
    author: "Rohit Sharma",
    desc: "India’s UPI is now expanding globally, enabling seamless international transactions with lower fees and faster settlements...",
    img: "/latest/l5.jpg",
    link: "https://fintechnews.my/55637/ai/ai-malaysia-banking-roundtable/",
  },

  // ⭐ EXTRA ARTICLE 2 ⭐
  {
    id: 6,
    title: "Why cybersecurity will define fintech growth in 2025",
    author: "Meera Iyer",
    desc: "With rising digital threats, fintech companies must adopt multi-layered security to protect customers and maintain trust...",
    img: "/latest/l6.jpg",
    link: "https://www.fintechweekly.com/magazine/articles/uk-research-project-bnpl-debt-risks-swansea-university",
  },
];

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-0 top-1/2 z-50 hidden md:hidden lg:block -translate-y-1/2 bg-white shadow-md p-3 rounded-full cursor-pointer"
    onClick={onClick}
  >
    <FaChevronRight className="text-gray-500" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-0 top-1/2 z-50 hidden md:hidden lg:block -translate-y-1/2 bg-white shadow-md p-3 rounded-full cursor-pointer"
    onClick={onClick}
  >
    <FaChevronLeft className="text-gray-500" />
  </div>
);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // one by one animate
    },
  },
};

const itemEffect = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const LatestNewsHome = ({ activeNews }) => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1024, // lg
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const displayTile =
    activeNews && activeNews.length > 0
      ? activeNews[0].pageTitle
      : "Latest News";

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="pt-20 pb-20"
    >
      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-[28px] md:text-[37px] font-bold text-[#2A3855]">
          {displayTile}
        </h2>
        <div className="w-16 h-[3px] bg-[#2A3855] mx-auto mt-4"></div>
      </div>

      {/* Carousel Section */}
      <div className="max-w-7xl hidden md:block mx-auto px-6 overflow-hidden ">
        <Slider {...settings}>
          {activeNews?.map((item) => (
            <motion.div variants={itemEffect} key={item.id} className="px-3">
              <div className="bg-white rounded-2xl shadow-sm  hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.newsTitle}
                  className="w-full h-56 object-cover"
                />

                {/* Content */}
                <div className="p-8">
                  <a
                    href={item.link}
                    target="_blank"
                    //to={`/news/${item.id}`}
                    className="text-[21px] md:text-[18px] font-bold text-[#2A3855] leading-snug mb-2 block"
                  >
                    {item.newsTitle}
                  </a>

                  <p className="text-gray-400 text-sm mb-4">By {item.byName}</p>

                  <p className="text-gray-600 text-[16px] truncate mb-6">
                    {item.description}
                  </p>

                  <a
                    href={item.link}
                    target="_blank"
                    //to={`/news/${item.id}`}
                    className="text-[#2A3855] text-[16px] font-semibold flex items-center gap-2 hover:gap-4 transition-all"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
      <div className="max-w-7xl md:hidden mx-auto px-6 overflow-hidden">
        <Slider {...settings} slidesToShow={1}>
          {activeNews?.map((item) => (
            <motion.div variants={itemEffect} key={item.id} className="px-3">
              <div className="bg-white rounded-2xl shadow-sm  hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.newsTitle}
                  className="w-full h-56 object-cover"
                />

                {/* Content */}
                <div className="p-8">
                  <a
                    href={item.link}
                    target="_blank"
                    //to={`/news/${item.id}`}
                    className="text-[21px] md:text-[18px] font-bold text-[#2A3855] leading-snug mb-2 block"
                  >
                    {item.newsTitle}
                  </a>

                  <p className="text-gray-400 text-sm mb-4">By {item.byName}</p>

                  <p className="text-gray-600 text-[16px] truncate mb-6">
                    {item.description}
                  </p>

                  <a
                    href={item.link}
                    target="_blank"
                    //to={`/news/${item.id}`}
                    className="text-[#2A3855] text-[16px] font-semibold flex items-center gap-2 hover:gap-4 transition-all"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </motion.section>
  );
};

export default LatestNewsHome;
