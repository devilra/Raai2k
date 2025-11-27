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

const Home = () => {
  return (
    <div className="">
      <Banner />
      <WelcomeSection />
      <PlatformSection />
      <VideoSection />
      <OurServices />
      <WhyChoose />
      <ThingsYouGet />
      <ContactRequest />
      <GlobalLeadership />
    </div>
  );
};

export default Home;
