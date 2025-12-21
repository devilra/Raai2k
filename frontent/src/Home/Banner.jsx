import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSpinner } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveSlides } from "../redux/AdminHomeSlices/adminHomeSlice";

// const bannerData = [
//   {
//     id: 1,
//     title: "Helping Leaders",
//     desc: "We look forward to help you in taking your company to new height.",
//     img: "/carosel/c1.jpg",
//   },
//   {
//     id: 2,
//     title: "Business Growth",
//     desc: "Grow your business with our expert consulting and guidance.",
//     img: "/carosel/c2.jpg",
//   },
//   {
//     id: 3,
//     title: "Creative Solutions",
//     desc: "We provide creative solutions tailored for your success.",
//     img: "/carosel/c3.jpg",
//   },

//   // ⭐ NEWLY ADDED 3 SLIDES ⭐
//   {
//     id: 4,
//     title: "Fintech Innovation",
//     desc: "Build secure, scalable, next-gen fintech products with our expertise.",
//     img: "/carosel/c7.jpg",
//     objectPos: "object-right",
//   },
//   {
//     id: 5,
//     title: "Digital Transformation",
//     desc: "Transform your business processes with modern technology solutions.",
//     img: "/carosel/c5.jpg",
//     objectPos: "object-[100%_50%]",
//   },
//   {
//     id: 6,
//     title: "Smart Automation",
//     desc: "Automate workflows and improve efficiency with intelligent systems.",
//     img: "/carosel/c6.jpg",
//     objectPos: "object-[100%_50%]",
//   },
//   // {
//   //   id: 7,
//   //   title: "AI-Powered Insights",
//   //   desc: "Leverage data intelligence to make smarter business decisions.",
//   //   img: "/carosel/c10.jpg",
//   //   objectPos: "object-center",
//   // },
// ];

const bannerData = [
  {
    id: 4,
    title: "Fintech Innovation",
    desc: "Build secure, scalable, next-gen fintech products with our expertise.",
    img: "/carosel/c7.jpg",
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
    id: 1,
    title: "Helping Leaders",
    desc: "Have an idea? Let’s build itYour product, your roadmap—powered by expert startup IT consulting",
    img: "/carosel/c1.jpg",
  },
  // {
  //   id: 1,
  //   title: "Helping Leaders",
  //   desc: "We look forward to help you in taking your company to new height.",
  //   img: "/carosel/c1.jpg",
  // },
  {
    id: 2,
    title: "Launch Fast",
    desc: "Stay Compliant. Scale ConfidentlyWe help fintech startups build secure, investor-ready products — from idea to launch and beyond",
    img: "/carosel/c2.jpg",
  },
  {
    id: 3,
    title: "Creative Solutions",
    desc: "Building fintech? Don’t do it aloneSpeak with our fintech experts",
    img: "/carosel/c3.jpg",
  },

  // ⭐ NEWLY ADDED 3 SLIDES ⭐
  // {
  //   id: 4,
  //   title: "Fintech Innovation",
  //   desc: "Build secure, scalable, next-gen fintech products with our expertise.",
  //   img: "/carosel/c7.jpg",
  //   objectPos: "object-right",
  // },

  {
    id: 6,
    title: "Smart Automation",
    desc: "Automate workflows and improve efficiency with intelligent systems.",
    img: "/carosel/c6.jpg",
    objectPos: "object-[100%_50%]",
  },
  // {
  //   id: 7,
  //   title: "AI-Powered Insights",
  //   desc: "Leverage data intelligence to make smarter business decisions.",
  //   img: "/carosel/c10.jpg",
  //   objectPos: "object-center",
  // },
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
  const dispatch = useDispatch();

  // Redux-லிருந்து டேட்டாவை எடுத்தல்
  const { activeSlides, isHomeLoading } = useSelector(
    (state) => state.homeCarosel
  );

  //console.log(activeSlides);

  useEffect(() => {
    if (activeSlides.length === 0) {
      dispatch(fetchActiveSlides());
    }
  }, [dispatch, activeSlides.length]);

  const settings = {
    dots: true,
    // Ensure the custom class is set here
    dotsClass: "slick-dots custom-dots-bottom",
    infinite: activeSlides.length > 1,
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

  // 1. Loading State: முதல் முறை லோட் ஆகும்போது மட்டும்
  if (isHomeLoading && activeSlides.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[45vh] md:h-[75vh] bg-gray-50">
        <FaSpinner className="animate-spin text-[#2A3855] text-5xl mb-4" />
        <p className="text-[#2A3855] font-medium animate-pulse">
          Loading amazing content...
        </p>
      </div>
    );
  }

  // 2. No Data State: ஒருவேளை ஆக்டிவ் ஸ்லைடுகள் ஏதும் இல்லை என்றால்
  if (activeSlides.length === 0) {
    return null; // அல்லது ஒரு fallback இமேஜ் காட்டலாம்
  }

  return (
    // ⚠️ CRITICAL CHANGE: Removed 'overflow-hidden' and 'h-[75vh]' from the wrapper.
    // Added 'pb-20' (padding bottom) to give space for the dots to show below the image.
    <div className="relative w-full pb-20">
      <Slider {...settings}>
        {activeSlides.map((item, index) => (
          // The individual slide maintains its height, e.g., h-[75vh]
          <div key={item.id} className="relative w-full h-[45vh] md:h-[75vh] ">
            {/* Background Image */}
            <img
              src={item.image}
              alt="banner"
              // w-full, h-full, object-cover ஆகியவற்றை நிரந்தரமாக வைக்கவும்.
              className={`w-full h-full object-cover ${
                // item.id 4 ஆக இருந்தால்: Custom position-ஐ மட்டும் பயன்படுத்தவும்.
                item.id === 4 || item.id === 7
                  ? "object-[10%_20%]"
                  : // item.id 4 இல்லையென்றால்: item.objectPos-ஐப் பயன்படுத்தவும்.
                    item.objectPos
              }`}
            />

            {/* Overlay Content */}
            <div
              // className="absolute top-0 left-5 w-full h-full flex items-center"
              className={`absolute top-0 left-5 w-full h-full flex
              ${
                item.id === 4 || item.id === 2 ? "justify-end" : "items-center"
              }`}
            >
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
                  {item.description}
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
