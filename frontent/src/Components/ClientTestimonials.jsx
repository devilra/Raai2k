import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// Testimonial Data
const testimonials = [
  {
    img: "/testimonial/t1.png",
    quote:
      "They handled everything — from product flow to MVP and compliance. Perfect for early-stage fintech.",
    name: "Founder, Wallet Startup",
    position: "Founder",
  },
  {
    img: "/testimonial/t2.png",
    quote:
      "Their fintech expertise is unmatched — they not only built our payments platform but helped us navigate compliance.",
    name: "CFO, Digital Banking Startup",
    position: "CFO",
  },
  {
    img: "/testimonial/t3.png",
    quote:
      "Thanks to their architecture and risk modeling, our lending system is both scalable and secure.",
    name: "CEO, Peer-to-Peer Lending Company",
    position: "CEO",
  },
];

// Custom Arrows
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

const ClientTestimonials = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        {/* <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A3855]">
          Client Testimonials
        </h2>

        <div className="flex justify-center items-center gap-2 mt-4 mb-14">
          <span className="h-2 w-2 bg-[#2A3855] rounded-full"></span>
          <span className="h-[3px] w-24 bg-[#2A3855] rounded-full"></span>
          <span className="h-2 w-2 bg-[#2A3855] rounded-full"></span>
        </div> */}

        {/* Carousel */}
        <Slider {...settings}>
          {testimonials.map((t, idx) => (
            <div key={idx}>
              <div className="flex flex-col md:flex-row items-center gap-10 p-6">
                {/* Left Image */}
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-60 h-60 object-cover rounded-2xl shadow-md"
                />

                {/* Right Content */}
                <div className="text-left">
                  <p className="text-gray-600 text-lg leading-relaxed mb-5">
                    {t.quote}
                  </p>

                  <h4 className="text-xl font-bold text-[#2A3855]">{t.name}</h4>
                  <p className="text-gray-500 text-sm">{t.position}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ClientTestimonials;
