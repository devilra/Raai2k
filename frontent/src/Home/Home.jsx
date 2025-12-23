import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import WelcomeSection from "./WelcomeSection";
import VideoSection from "./VideoSection";
import OurServices from "./OurServices";
import WhyChoose from "./WhyChoose";
import ThingsYouGet from "./ThingsYouGet";
import ContactRequest from "./ContactRequest";
import GlobalLeadership from "./GlobalLeadership";
import PlatformSection from "../Components/PlatformSection";
import PartnersComponent from "../Components/PartnersComponent";
import StatsSection from "../About/StatsSection";
import ClientTestimonials from "../Components/ClientTestimonials";
import LeadershipSection from "../Components/LeadershipSection";
import LatestNews from "../LatestNews/LatestNews";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveWelcome } from "../redux/AdminHomeSlices/welcomeContentSlice";
import { fetchActiveThings } from "../redux/AdminHomeSlices/ThingsYouGetSlice";
import { fetchActiveTestimonials } from "../redux/AdminHomeSlices/testimonialSlice";
import { fetchActiveNews } from "../redux/AdminHomeSlices/LatestNewsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchActiveLeaders } from "../redux/AdminAboutSlices/globalLeadershipSlice";
import { FaSpinner } from "react-icons/fa6";
import { fetchActiveVideo } from "../redux/AdminHomeSlices/videoContentSlice";
import { fetchActiveWhyChoose } from "../redux/AdminHomeSlices/WhyChooseUsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Redux States
  const { activeWelcome } = useSelector((state) => state.welcomeContent);
  const { activeThings } = useSelector((state) => state.thingsYouGet);
  const { activeTestimonials } = useSelector((state) => state.testimonials);
  const { activeNews } = useSelector((state) => state.latestNews);
  const { activeVideo } = useSelector((state) => state.videoContent);
  const { activeWhyChoose } = useSelector((state) => state.whyChooseUs);

  // நிபந்தனை: அனைத்து செக்ஷன்களிலும் டேட்டா இருக்கிறதா எனச் சரிபார்க்கிறது

  const hasHomeData =
    activeWelcome !== null ||
    activeThings.length > 0 ||
    activeTestimonials.length > 0 ||
    activeNews.length > 0 ||
    activeVideo.length > 0 ||
    activeWhyChoose.length > 0;

  console.log(activeWhyChoose);

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
          dispatch(fetchActiveWelcome()).then(unwrapResult),
          dispatch(fetchActiveLeaders()).then(unwrapResult),
          dispatch(fetchActiveThings()).then(unwrapResult),
          dispatch(fetchActiveTestimonials()).then(unwrapResult),
          dispatch(fetchActiveNews()).then(unwrapResult),
          dispatch(fetchActiveVideo()).then(unwrapResult),
          dispatch(fetchActiveWhyChoose()).then(unwrapResult),
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
    <div className="">
      <Banner />

      <WelcomeSection activeWelcome={activeWelcome} />

      <VideoSection activeVideo={activeVideo} />
      <OurServices />
      <WhyChoose activeWhyChoose={activeWhyChoose} />
      <ThingsYouGet activeThings={activeThings} />
      <ContactRequest />
      {/* <GlobalLeadership /> */}
      <LeadershipSection />
      <StatsSection />
      <ClientTestimonials activeTestimonials={activeTestimonials} />
      {/* <PartnersComponent /> */}
      <PlatformSection />
      <LatestNews activeNews={activeNews} />
    </div>
  );
};

export default Home;
