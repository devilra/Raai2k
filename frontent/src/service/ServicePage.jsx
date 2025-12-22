import React, { useEffect, useState } from "react";
import ServiceHome from "./ServiceHome";
import { ProcessWorkflow } from "./ProcessWorkflow";
import { EngagementModels } from "./EngagementModels";
import { IndustriesWeServe } from "./IndustriesWeServe";
import Faq from "../FAQ/Faq";
import CaseStudySection from "../Solutions/CaseStudySection";
import { useDispatch, useSelector } from "react-redux";

import { FaSpinner } from "react-icons/fa6";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchPublishedServiceBanners } from "../redux/AdminServiceSlice/ServiceBannerSlice";
import { fetchActiveIndustries } from "../redux/AdminServiceSlice/industryServeSlice";
import { fetchActiveFinTech } from "../redux/AdminServiceSlice/FintechServiceSlice";
import { fetchActiveEngagementModels } from "../redux/AdminServiceSlice/EngagementSlice";
import { fetchActiveCaseStudies } from "../redux/AdminServiceSlice/CaseStudySlice";

const ServicePage = () => {
  const dispatch = useDispatch();
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Redux Selectors
  const { activeServiceBanners } = useSelector((state) => state.serviceBanner);
  const { activeServices } = useSelector((state) => state.finTech); // FinTech slice-ல் 'services' என இருந்தால் அதை மாற்றிக்கொள்ளவும்
  const { activeCaseStudies } = useSelector((state) => state.caseStudy);
  const { activeEngagementModels } = useSelector((state) => state.engagement);
  const { activeIndustries } = useSelector((state) => state.industryServe);

  // அனைத்து டேட்டாவும் ஏற்கனவே இருக்கிறதா என்று சோதித்தல் (Cashing)
  const hasAllData =
    activeServiceBanners?.length > 0 &&
    activeIndustries?.length > 0 &&
    activeServices?.length > 0 &&
    activeEngagementModels?.length > 0;

  useEffect(() => {
    const fetchAllData = async () => {
      // ஏற்கனவே டேட்டா இருந்தால் மீண்டும் கால் செய்ய வேண்டாம்
      if (hasAllData) {
        setIsPageLoading(false);
        return;
      }

      try {
        setIsPageLoading(true);
        // 5 API-களும் இணையாக (Parallel) அழைக்கப்படுகின்றன
        await Promise.all([
          dispatch(fetchPublishedServiceBanners()).then(unwrapResult),
          dispatch(fetchActiveIndustries()).then(unwrapResult),
          dispatch(fetchActiveFinTech()).then(unwrapResult),
          dispatch(fetchActiveEngagementModels()).then(unwrapResult),
          // dispatch(fetchActiveCaseStudies()).then(unwrapResult),
        ]);
      } catch (error) {
        console.error("Service Data Fetching Error:", error);
      } finally {
        setIsPageLoading(false);
      }
    };
    fetchAllData();
  }, [dispatch, hasAllData]);

  // லோடிங் ஸ்பின்னர்
  if (isPageLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] bg-gray-50">
        <FaSpinner className="animate-spin text-[#2A3855] text-5xl mb-4" />
        {/* <p className="text-[#2A3855] font-medium animate-pulse">
          Loading Services...
        </p> */}
      </div>
    );
  }

  return (
    <div>
      <ServiceHome />
      <EngagementModels />
      {/* <ProcessWorkflow /> */}
      <CaseStudySection />

      {/* <IndustriesWeServe /> */}
      {/* <Faq /> */}
    </div>
  );
};

export default ServicePage;
