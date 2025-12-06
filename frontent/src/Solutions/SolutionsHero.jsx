import React from "react";

const SolutionsHero = () => {
  return (
    <section
      className="w-full h-[310px] md:h-[380px] bg-cover bg-center relative flex items-center"
      style={{
        backgroundImage: "url('/solution/solution.jpg')",
        backgroundPosition: "10% 60%",
      }} // Change if needed
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#1f2937]/90 via-[#1f2937]/70 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl  px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Capabilities
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl leading-relaxed">
          End-to-end fintech and technology solutions designed for speed,
          security, and scale. From neobanking to lending, payments, and wealth
          — we build systems that power the future of finance.
        </p>

        {/* Breadcrumb */}
        {/* <div className="flex items-center gap-2 mt-5 text-gray-300 font-medium">
          <span>Home</span>
          <span className="text-lg">›</span>
          <span>Solutions</span>
        </div> */}
      </div>
    </section>
  );
};

export default SolutionsHero;
