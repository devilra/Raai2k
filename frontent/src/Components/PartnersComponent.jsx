import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// Partner Images (from your upload)
const partners = [
  { name: "Partner 1", img: "/partner/p1.png" },
  { name: "Partner 2", img: "/partner/p2.png" },
  { name: "Partner 3", img: "/partner/p3.png" },
  { name: "Partner 4", img: "/partner/p4.png" },
  { name: "Partner 5", img: "/partner/p5.png" },
  { name: "Partner 6", img: "/partner/p6.png" },
];

const NextArrow = ({ onClick }) => (
  <div
    className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:flex 
    items-center justify-center bg-white p-3 rounded-full shadow-md cursor-pointer z-20"
    onClick={onClick}
  >
    <FaChevronRight className="text-[#2A3855]" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute -left-2 top-1/2 -translate-y-1/2 hidden lg:flex 
    items-center justify-center bg-white p-3 rounded-full shadow-md cursor-pointer z-20"
    onClick={onClick}
  >
    <FaChevronLeft className="text-[#2A3855]" />
  </div>
);

const PartnersComponent = () => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1800,
    speed: 600,
    arrows: false,
    //nextArrow: <NextArrow />,
    //prevArrow: <PrevArrow />,
    pauseOnHover: false,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="py-16 mb-24 bg-[#F2F2F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        {/* <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2A3855]">
          Trusted Partners
        </h2>

        <div className="w-24 h-[3px] bg-[#2A3855] mx-auto mt-3 mb-12"></div> */}

        <Slider {...settings}>
          {partners.map((item, i) => (
            <div key={i} className="flex justify-center items-center px-6">
              <img
                src={item.img}
                alt={item.name}
                className="h-20 w-auto  hover:opacity-70 transition-all duration-300"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PartnersComponent;
