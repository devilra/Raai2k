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

  // ⭐ NEWLY ADDED 3 SLIDES ⭐
  {
    id: 4,
    title: "Fintech Innovation",
    desc: "Build secure, scalable, next-gen fintech products with our expertise.",
    img: "/carosel/c4.jpg",
    objectPos: "object-right",
  },
  {
    id: 5,
    title: "Digital Transformation",
    desc: "Transform your business processes with modern technology solutions.",
    img: "/carosel/c5.jpg",
    objectPos: "object-[100%_50%]",
  },
  {
    id: 6,
    title: "Smart Automation",
    desc: "Automate workflows and improve efficiency with intelligent systems.",
    img: "/carosel/c6.jpg",
    objectPos: "object-[100%_50%]",
  },
];

// Custom Arrow Components (No change)
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
    className="absolute top-1/2 hidden md:hidden lg:block  left-2 z-20 p-3 bg-white/30 backdrop-blur-2xl rounded-full cursor-pointer shadow-md"
  >
    <FaChevronLeft className="text-[#2A3855] text-xl" />
  </div>
);

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    // Ensure the custom class is set here
    dotsClass: "slick-dots custom-dots-bottom",
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

  return (
    // ⚠️ CRITICAL CHANGE: Removed 'overflow-hidden' and 'h-[75vh]' from the wrapper.
    // Added 'pb-20' (padding bottom) to give space for the dots to show below the image.
    <div className="relative w-full pb-20">
      <Slider {...settings}>
        {bannerData.map((item, index) => (
          // The individual slide maintains its height, e.g., h-[75vh]
          <div key={item.id} className="relative w-full h-[45vh] md:h-[75vh] ">
            {/* Background Image */}
            <img
              src={item.img}
              alt="banner"
              className={`w-full h-full object-cover ${item.objectPos}`}
            />

            {/* Overlay Content */}
            <div className="absolute top-0 left-5 w-full h-full flex items-center">
              <motion.div
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
