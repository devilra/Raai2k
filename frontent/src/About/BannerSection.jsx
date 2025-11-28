import React from "react";

const CeoMessage = () => {
  return (
    <section className="w-full pb-20 bg-gray-50">
      {/* 🔵 TOP BACKGROUND BANNER */}
      <div
        className="w-full h-[300px] md:h-[350px] bg-cover relative bg-center flex flex-col justify-center px-10 md:px-20"
        style={{ backgroundImage: "url('/about/a1.jpg')" }}
      >
        {/* TITLE */}

        <div className="absolute inset-0 bg-[#1f2937]/60"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-xl">
          About Us
        </h1>

        {/* BREADCRUMB */}
        {/* <p className="mt-3 text-white font-medium flex items-center gap-2">
          Home <span className="text-xl">»</span> About
        </p> */}
      </div>

      {/* 🔶 CEO MESSAGE SECTION */}
      <div className="max-w-6xl mx-auto px-6  mt-10">
        <div className="bg-white shadow-md rounded-2xl flex flex-col md:flex-col md:items-center lg:items-start lg:flex   lg:flex-row  lg:gap-5">
          {/* LEFT IMAGE */}
          <div className="">
            <img
              src="/about/ceo.jpg"
              alt="CEO"
              className="h-[400px] w-full lg:w-[700px] md:h-[300px] lg:h-[450px] overflow-hidden md:rounded  object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="p-10 flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-[#2A3855] mb-4">
              Message From CEO
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              At RAai2K, our mission is to empower businesses by solving their
              most complex challenges through innovation, creativity, and
              technology.
              <br />
              <br />
              We believe in strong partnerships, transparency, and delivering
              solutions that bring long-term value. Our team blends passion,
              skill, and dedication to help companies achieve success in a
              rapidly evolving digital world.
            </p>

            {/* SIGNATURE */}
            <div className="mt-6">
              <img src="/signature.png" alt="sign" className="h-10 mb-2" />
              <h4 className="text-lg font-semibold text-[#2A3855]">
                RENAL SCOTT
              </h4>
              <p className="text-sm text-gray-500">CEO, RAai2K</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoMessage;
