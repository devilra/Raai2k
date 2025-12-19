import React from "react";
import BannerContent from "./BannerContent/BannerContent";
import WelcomeSection from "./WelcomeSection";
import LatestNews from "./LatestNews/LatestNews";
import ClientTestimonial from "./ClientTestimonial/ClientTestimonial";
import ThinkYouGet from "./ThinkYouGet/ThinkYouGet";

const HomePageContent = () => {
  return (
    <div>
      <BannerContent />
      <WelcomeSection />
      <ThinkYouGet />
      <ClientTestimonial />
      <LatestNews />
    </div>
  );
};

export default HomePageContent;
