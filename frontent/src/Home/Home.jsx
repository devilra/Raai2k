import React from "react";
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

const Home = () => {
  return (
    <div className="">
      <Banner />

      <WelcomeSection />
      {/* <PlatformSection /> */}
      <VideoSection />
      <OurServices />
      <WhyChoose />
      <ThingsYouGet />
      <ContactRequest />
      <GlobalLeadership />
      <LeadershipSection />
      <StatsSection />
      <ClientTestimonials />
      <PartnersComponent />
      <LatestNews />
    </div>
  );
};

export default Home;
