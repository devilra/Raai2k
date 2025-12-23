import React, { useEffect, useState } from "react";
import SolutionsHero from "./SolutionsHero";
import SolutionsList from "./SolutionsList";
import ExpertiseSection from "./ExpertiseSection";
import ProcessWorkflow from "./ProcessWorkflow";
import IndustriesWeServe from "./IndustriesWeServe";
import CaseStudySection from "./CaseStudySection";
import Accelerators from "./Accelerators";
import { FaSpinner } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveExpertise } from "../redux/AdminSolutionSlices/ExpertiseSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchPublishedSolutionBanner } from "../redux/AdminSolutionSlices/solutionBannerSlice";
import { fetchActiveOurSolution } from "../redux/AdminSolutionSlices/OurSolutionSlice";
import { fetchActiveOurProcess } from "../redux/AdminSolutionSlices/OurProcessSlice";

const Solutions = () => {
  const dispatch = useDispatch();
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Redux States
  const { activeBanners } = useSelector((state) => state.solutionBanner);
  const { activeOurSolutions } = useSelector((state) => state.ourSolution);
  const { activeExpertise } = useSelector((state) => state.expertise);

  const { activeOurProcess } = useSelector((state) => state.ourProcess);

  // நிபந்தனை: அனைத்து செக்ஷன்களிலும் டேட்டா இருக்கிறதா எனச் சரிபார்க்கிறது

  const hasHomeData =
    activeBanners.length > 0 &&
    activeOurSolutions.length > 0 &&
    activeExpertise.length > 0 &&
    activeOurProcess.length > 0;

  // console.log(activeOurProcess);

  useEffect(() => {
    const fetchAllHomeData = async () => {
      // டேட்டா ஏற்கனவே இருந்தால் API கால் செய்ய வேண்டாம்
      if (hasHomeData) {
        setIsPageLoading(false);
        return;
      }

      try {
        setIsPageLoading(true);

        // Promise.all மற்றும் unwrapResult பயன்படுத்தி இணை இணையாக (Parallel) API கால் செய்தல்
        await Promise.all([
          dispatch(fetchPublishedSolutionBanner()).then(unwrapResult),
          dispatch(fetchActiveOurSolution()).then(unwrapResult),

          dispatch(fetchActiveExpertise()).then(unwrapResult),
          dispatch(fetchActiveOurProcess()).then(unwrapResult),
        ]);
      } catch (error) {
        console.error("Home Page Parallel Fetch Error:", error);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchAllHomeData();
  }, [dispatch]);

  // Loading Screen
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
      <SolutionsHero activeBanners={activeBanners} />
      <SolutionsList activeOurSolutions={activeOurSolutions} />
      <ExpertiseSection activeExpertise={activeExpertise} />
      {/* <Accelerators /> */}
      {/* <ProcessWorkflow activeOurProcess={activeOurProcess} /> */}
      {/* <IndustriesWeServe /> */}
      {/* <CaseStudySection /> */}
    </div>
  );
};

export default Solutions;
