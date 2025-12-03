import React from "react";

const CeoMessage = () => {
  return (
    <section className="w-full pb-20 bg-gray-50">
      {/* 🔵 TOP BACKGROUND BANNER */}
      <div
        className="w-full h-[300px] md:h-[350px] bg-cover relative bg-center flex flex-col justify-center px-10 md:px-20"
        style={{ backgroundImage: "url('/about/about.jpg')" }}
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
      <div className="max-w-6xl mx-auto px-6 mt-16 space-y-14">
        {/* ======= FOUNDER 1 ======= */}
        <div className="bg-white shadow-md rounded-2xl flex flex-col lg:flex-row gap-5">
          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2">
            <img
              src="/global/f.jpg"
              alt="Founder"
              className="h-[400px] w-full object-cover object-[0%_8%] rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="p-10 flex flex-col justify-center lg:w-1/2">
            <h3 className="text-2xl font-bold text-[#2A3855] ">KARTHI NAT</h3>
            <p className="text-sm text-gray-600 font-medium mb-5 px-3">
              (Founder)
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Fintech is changing faster than we could imagine—and we're exactly
              here to bridge that gap. Our mission is to help teams build
              innovative products the right way: faster, safer, and with
              absolute clarity.
              <br />
              <br />
              Most founders don't fail because their idea is weak, but because
              the financial ecosystem is complex. While startups move fast,
              fintech demands precision — and that’s where we come in.
            </p>

            {/* SIGNATURE AREA (Optional) */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-[#2A3855]">
                KARTHI NAT
              </h4>
              <p className="text-sm text-gray-500">Founder, RAai2K</p>
            </div>
          </div>
        </div>

        {/* ======= FOUNDER 2 ======= */}
        <div className="bg-white shadow-md rounded-2xl flex flex-col lg:flex-row-reverse gap-5">
          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-1/2">
            <img
              src="/global/m.jpg"
              alt="Founder"
              className="h-[400px] w-full object-cover object-[0%_8%] rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none"
            />
          </div>

          {/* LEFT CONTENT */}
          <div className="p-10 flex flex-col justify-center lg:w-1/2">
            <h3 className="text-2xl font-bold text-[#2A3855]  ">SENTHIL</h3>
            <p className="text-sm text-gray-600 font-medium mb-5 px-3">
              (Founder)
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              We help teams build future-proof solutions with reduced dependency
              and minimized risks. Through our Headless (Omni-channel)
              implementations and deep OOTB/SAAS expertise, we deliver scalable
              and modern systems.
              <br />
              <br />
              Our pricing is unmatched — almost 1/3rd of any typical SI —
              because we operate without middlemen or commission structures.
              Every benefit is passed fully to the client.
            </p>

            {/* SIGNATURE AREA (Optional) */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-[#2A3855]">SENTHIL</h4>
              <p className="text-sm text-gray-500">Founder, RAai2K</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoMessage;
