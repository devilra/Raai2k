import React from "react";
import CompanyOverview from "./CompanyOverview";

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

      <section>
        <CompanyOverview />
      </section>

      {/* 🔶 CEO MESSAGE SECTION */}
      <div className="max-w-6xl mx-auto px-6 mt-16 space-y-14">
        {/* ======= FOUNDER 1 ======= */}
        <div className="bg-white shadow-md rounded-2xl flex flex-col lg:flex-row lg:justify-around gap-5">
          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/4 ">
            <img
              src="/global/f.png"
              alt="Founder"
              className="h-[400px] w-[300px]  object-cover  rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="p-10 flex flex-col justify-center lg:w-1/2">
            <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855] ">
              KARTHI NAT
            </h3>
            <p className="text-sm text-gray-400">Founder, RAai2K</p>

            <p className="text-gray-600 text-[16px] my-6">
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
            {/* <div className="mt-4">
              <h4 className="text-lg font-semibold text-[#2A3855]">
                KARTHI NAT
              </h4>
             
            </div> */}
          </div>
        </div>

        {/* ======= FOUNDER 2 ======= */}
        <div className="bg-white shadow-md rounded-2xl flex flex-col lg:flex-row-reverse lg:justify-around gap-5">
          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-1/4 md:pr-5">
            <img
              src="/global/m.jpg"
              alt="Founder"
              className="h-[400px] w-[300px] object-cover  rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none"
            />
          </div>

          {/* LEFT CONTENT */}
          <div className="p-10 flex flex-col justify-center lg:w-1/2">
            <h3 className="text-[21px] md:text-[18px] font-bold text-[#2A3855]  ">
              SENTHIL
            </h3>
            <p className="text-[16px] text-gray-400">Founder, RAai2K</p>

            <p className="text-gray-600 text-[16px] my-6">
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
            {/* <div className="mt-4">
              <h4 className="text-lg font-semibold text-[#2A3855]">SENTHIL</h4>
              <p className="text-[16px] text-gray-400">Founder, RAai2K</p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoMessage;
