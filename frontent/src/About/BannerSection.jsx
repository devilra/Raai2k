import React, { useEffect, useState } from "react";
import CompanyOverview from "./CompanyOverview";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishedAboutBanner } from "../redux/AdminAboutSlices/aboutBannerSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { FaSpinner } from "react-icons/fa";
import { fetchActiveCeoMessage } from "../redux/AdminAboutSlices/aboutCeoSlice";
import { fetchActiveCompanyOverviews } from "../redux/AdminAboutSlices/companyOverviewSlice";
import { fetchActiveLeaders } from "../redux/AdminAboutSlices/globalLeadershipSlice";
import { fetchActiveOurApproaches } from "../redux/AdminAboutSlices/ourApproachSlice";

// Detect if screen is large
const isLargeScreen = window.innerWidth >= 1024;

// Slide effect ONLY for LG screens
const fadeLeft = {
  hidden: { opacity: 0, x: isLargeScreen ? -60 : 0 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: isLargeScreen ? 60 : 0 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// Mobile + Tablet → normal fade
const itemEffect = {
  hidden: { opacity: 0, y: !isLargeScreen ? 50 : 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const CeoMessage = () => {
  const dispatch = useDispatch();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { activeAboutBanners } = useSelector((state) => state.aboutBanner);
  const { activeMessages } = useSelector((state) => state.ceoContent);
  const { activeOverviews } = useSelector((state) => state.companyOverview);
  const { activeApproaches } = useSelector((state) => state.ourApproach);
  const { activeLeaders } = useSelector((state) => state.globalLeadership);

  //console.log("ActiveLeaders", activeLeaders);

  const hasAllData =
    activeAboutBanners.length > 0 &&
    activeMessages.length > 0 &&
    activeOverviews.length > 0 &&
    activeLeaders.length > 0 &&
    activeApproaches.length > 0;

  const firstBanner =
    activeAboutBanners && activeAboutBanners.length > 0
      ? activeAboutBanners[0]
      : null;

  const firstCeoMessage =
    activeMessages && activeMessages.length > 0 ? activeMessages[0] : null;

  useEffect(() => {
    const fetchAllData = async () => {
      if (hasAllData) {
        setIsPageLoading(false);
        return;
      }

      try {
        setIsPageLoading(true);
        // 6 API-களும் இணையாக (Parallel) அழைக்கப்படுகின்றன
        await Promise.all([
          dispatch(fetchPublishedAboutBanner()).then(unwrapResult),
          dispatch(fetchActiveCeoMessage()).then(unwrapResult),
          dispatch(fetchActiveCompanyOverviews()).then(unwrapResult),
          dispatch(fetchActiveLeaders()).then(unwrapResult),
          dispatch(fetchActiveOurApproaches()).then(unwrapResult),
        ]);
      } catch (error) {
        console.error("Data Fetching Error:", error);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchAllData();
  }, [dispatch]);

  if (isPageLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[45vh] md:h-[75vh] bg-gray-50">
        <FaSpinner className="animate-spin text-[#2A3855] text-5xl mb-4" />
        {/* <p className="text-[#2A3855] font-medium animate-pulse">
          Loading amazing content...
        </p> */}
      </div>
    );
  }

  return (
    <div>
      <section className="w-full  bg-gray-50">
        {/* 🔵 TOP BACKGROUND BANNER */}
        <div
          className="w-full h-[300px] md:h-[350px] bg-cover relative bg-center flex flex-col justify-center  pt-0 md:px-20"
          style={{
            backgroundImage: `url(${firstBanner?.image || "/about/about.jpg"})`,
          }}
        >
          {/* TITLE */}

          <div className="absolute inset-0 bg-[#1f2937]/60"></div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-xl">
            {firstBanner?.title || "About Us"}
          </h1>

          {/* BREADCRUMB */}
          {/* <p className="mt-3 text-white font-medium flex items-center gap-2">
          Home <span className="text-xl">»</span> About
        </p> */}
        </div>

        {/* 🔶 CEO MESSAGE SECTION */}
        <div className="max-w-6xl mx-auto px-6 mt-20 space-y-14">
          {/* ========= FOUNDER 1 (Fade Left on LG, Fade Up on small) ========= */}
          <motion.div
            variants={isLargeScreen ? fadeLeft : itemEffect}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white  rounded-2xl flex flex-col lg:flex-row lg:px-5 gap-3"
          >
            {/* LEFT IMAGE */}
            <div className="w-full lg:w-1/4">
              <img
                src={firstCeoMessage?.image || "/global/f.png"}
                alt="Founder"
                className="h-[400px] w-[300px] object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="p-10 flex flex-col justify-center lg:w-1/2">
              <h3 className="text-[21px] md:text-[19px] font-bold text-[#2A3855]">
                {firstCeoMessage?.title || "Message From CEO"}
              </h3>

              <p className="text-gray-600 text-[16px] my-6">
                {firstCeoMessage?.description ||
                  "Fintech is changing faster than we could imagine—and we're here to bridge that gap..."}
              </p>

              <h3 className="text-[21px] md:text-[18px] font-medium text-[#2A3855]">
                {firstCeoMessage?.ceoName || "KARTHI NAT"}
              </h3>
              <p className="text-sm text-gray-400">
                {firstCeoMessage?.ceoPosition || "Founder, RAai2K"}
              </p>
            </div>
          </motion.div>

          {/* ========= FOUNDER 2 (Fade Right on LG, Fade Up on small) ========= */}
          {/* <motion.div
            variants={isLargeScreen ? fadeRight : itemEffect}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white shadow rounded-2xl flex flex-col lg:flex-row lg:px-5 gap-3"
          >
            <div className="w-full lg:w-1/4 md:pr-5">
              <img
                src="/global/m.png"
                alt="Founder"
                className="h-[400px] w-[300px] object-cover rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none"
              />
            </div>

            <div className="p-10 flex flex-col justify-center lg:w-1/2">
              <h3 className="text-[21px] md:text-[19px] font-bold text-[#2A3855]">
                Message From CEO
              </h3>

              <p className="text-gray-600 text-[16px] my-6">
                We help teams build future-proof solutions with reduced
                dependency and minimized risks...
              </p>
              <h3 className="text-[21px] md:text-[18px] font-medium text-[#2A3855]">
                SENTHIL
              </h3>
              <p className="text-[16px] text-gray-400">Founder, RAai2K</p>
            </div>
          </motion.div> */}
        </div>

        <section>
          <CompanyOverview
            activeOverviews={activeOverviews}
            activeApproaches={activeApproaches}
          />
        </section>
      </section>
    </div>
  );
};

export default CeoMessage;
