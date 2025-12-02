import React from "react";

const CaseStudiesBanner = () => {
  return (
    <div>
      {" "}
      <section
        className="w-full h-[310px] md:h-[380px] bg-cover bg-center relative flex flex-col justify-center px-10 md:px-20"
        style={{ backgroundImage: "url('/case/c1.jpg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#1f2937]/80 to-[#111827]/30"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-xl">
            Case Studies
          </h1>
          {/* <p className=" text-white  max-w-2xl pt-5 mb-16">
            We help startups, enterprises and fintech companies build modern,
            scalable and secure digital products.
          </p> */}
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesBanner;
