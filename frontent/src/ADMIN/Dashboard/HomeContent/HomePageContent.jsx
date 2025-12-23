import React from "react";
import BannerContent from "./BannerContent/BannerContent";
import WelcomeSection from "./WelcomeSection";
import LatestNews from "./LatestNews/LatestNews";
import ClientTestimonial from "./ClientTestimonial/ClientTestimonial";
import ThinkYouGet from "./ThinkYouGet/ThinkYouGet";
import VideoContent from "./VideoContent/VideoContent";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

const HomePageContent = () => {
  return (
    <div>
      <BannerContent />
      <WelcomeSection />
      <VideoContent />
      <WhyChooseUs />
      <ThinkYouGet />
      <ClientTestimonial />
      <LatestNews />
    </div>
  );
};

export default HomePageContent;
