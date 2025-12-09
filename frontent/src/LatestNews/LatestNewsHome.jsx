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
  },
  {
    id: 2,
    title: "What brexit means for data protection law",
    author: "Enrico Ambrosi",
    desc: "Assuming that the referendum is not ignored completely, there are two possible futures for the UK...",
    img: "/latest/l2.jpg",
  },
  {
    id: 3,
    title: "The growing menace of social engineering fraud",
    author: "Robson",
    desc: "Social engineering involves the collection of information from various sources about a target...",
    img: "/latest/l3.jpg",
  },

  // ⭐ ADDED NEW ARTICLE ⭐
  {
    id: 4,
    title: "How AI is transforming financial services in 2025",
    author: "Sarah Mitchell",
    desc: "AI-driven automation and predictive analytics are reshaping lending, compliance, and customer experience in the fintech world...",
    img: "/latest/l4.jpg",
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

const LatestNewsHome = () => {
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
          Latest News
        </h2>
        <div className="w-16 h-[3px] bg-[#2A3855] mx-auto mt-4"></div>
      </div>

      {/* Carousel Section */}
      <div className="max-w-7xl hidden md:block mx-auto px-6 overflow-hidden ">
        <Slider {...settings}>
          {newsData.map((item) => (
            <motion.div variants={itemEffect} key={item.id} className="px-3">
              <div className="bg-white rounded-2xl shadow-sm  hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />

                {/* Content */}
                <div className="p-8">
                  <Link
                    to={`/news/${item.id}`}
                    className="text-[21px] md:text-[18px] font-bold text-[#2A3855] leading-snug mb-2 block"
                  >
                    {item.title}
                  </Link>

                  <p className="text-gray-400 text-sm mb-4">By {item.author}</p>

                  <p className="text-gray-600 text-[16px] truncate mb-6">
                    {item.desc}
                  </p>

                  <Link
                    to={`/news/${item.id}`}
                    className="text-[#2A3855] text-[16px] font-semibold flex items-center gap-2 hover:gap-4 transition-all"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
      <div className="max-w-7xl md:hidden mx-auto px-6 overflow-hidden">
        <Slider {...settings} slidesToShow={1}>
          {newsData.map((item) => (
            <motion.div variants={itemEffect} key={item.id} className="px-3">
              <div className="bg-white rounded-2xl shadow-sm  hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />

                {/* Content */}
                <div className="p-8">
                  <Link
                    to={`/news/${item.id}`}
                    className="text-[21px] md:text-[18px] font-bold text-[#2A3855]  mb-2 block"
                  >
                    {item.title}
                  </Link>

                  <p className="text-gray-500 text-sm mb-4">By {item.author}</p>

                  <p className="text-gray-600 text-[16px]  mb-6">{item.desc}</p>

                  <Link
                    to={`/news/${item.id}`}
                    className="text-[#2A3855] font-semibold flex items-center gap-2 hover:gap-4 transition-all"
                  >
                    Learn More →
                  </Link>
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
