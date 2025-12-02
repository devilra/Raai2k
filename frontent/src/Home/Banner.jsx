import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const bannerData = [
  {
    id: 1,
    title: "Helping Leaders",
    desc: "We look forward to help you in taking your company to new height.",
    img: "/carosel/c1.jpg",
  },
  {
    id: 2,
    title: "Business Growth",
    desc: "Grow your business with our expert consulting and guidance.",
    img: "/carosel/c2.jpg",
  },
  {
    id: 3,
    title: "Creative Solutions",
    desc: "We provide creative solutions tailored for your success.",
    img: "/carosel/c3.jpg",
  },
];

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute hidden md:hidden lg:block top-1/2 right-2 z-20 p-3 bg-white/70 backdrop-blur-lg rounded-full cursor-pointer shadow-md"
  >
    <FaChevronRight className="text-[#2A3855] text-xl" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 hidden md:hidden lg:block  left-2 z-20 p-3 bg-white/30 backdrop-blur-2xl rounded-full cursor-pointer shadow-md"
  >
    <FaChevronLeft className="text-[#2A3855] text-xl" />
  </div>
);

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    // Re-animate text on slide change
    beforeChange: (oldIndex, newIndex) => {
      setActiveSlide(newIndex);
    },
  };

  // அனிமேஷன் மாறுபாடுகள் (Variants)

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {bannerData.map((item, index) => (
          <div key={item.id} className="relative w-full h-[80vh]">
            {/* Background Image */}
            <img
              src={item.img}
              alt="banner"
              className="w-full h-full  object-cover"
            />

            {/* Overlay Content */}
            <div className="absolute top-0 left-5 w-full h-full flex items-center">
              <motion.div
                //key={activeSlide}
                //initial={{ opacity: 0, x: -60 }}
                initial={false}
                animate={activeSlide === index ? "active" : "inactive"}
                variants={{
                  active: {
                    y: 0,
                    opacity: 1,
                    transition: { delay: 0.5, duration: 0.5 },
                  },
                  inactive: { y: 20, opacity: 0 },
                }}
                //transition={{ duration: 0.7 }}
                className="text-left max-w-xl px-10"
              >
                <h1 className="text-3xl md:text-6xl font-bold text-[#2A3855] mb-5 drop-shadow-md">
                  {item.title}
                </h1>
                <p className="text-2xl text-[#2A3855] font-semibold mb-10 max-w-[600px]">
                  {item.desc}
                </p>
                {/* Buttons */}
                <div className="flex gap-5">
                  <Link
                    to="/service"
                    className="px-7 py-3 text-[13px] md:text-[15px] bg-[#2A3855] text-white rounded-md hover:bg-[#1d2a47] flex items-center gap-2"
                  >
                    Read more <FaChevronRight />
                  </Link>

                  <Link
                    to="/contact"
                    className="px-7 py-3 text-[13px] md:text-[15px] bg-yellow-400 text-[#2A3855] rounded-md hover:bg-yellow-500 flex items-center gap-2"
                  >
                    Contact us <FaChevronRight />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
