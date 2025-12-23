import React from "react";

const SolutionsHero = ({ activeBanners }) => {
  //console.log(activeBanners);
  // Array-இல் டேட்டா இருக்கிறதா என்று சரிபார்த்து முதல் ஆப்ஜெக்ட்டை எடுக்கிறோம்
  const hasData = activeBanners && activeBanners.length > 0;

  const banner = hasData ? activeBanners[0].image : "/solution/solution.jpg";
  const title = hasData ? activeBanners[0].title : "Solutions";

  // 🚨 இங்கே தான் மாற்றம் செய்யப்பட்டுள்ளது: activeBanners[0].description
  const para = hasData ? activeBanners[0].description : "";

  return (
    <section
      className="w-full h-[310px] md:h-[380px] bg-cover bg-center relative flex items-center"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundPosition: "10% 60%",
      }} // Change if needed
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#1f2937]/90 via-[#1f2937]/70 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl  px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl leading-relaxed">
          {para}
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
