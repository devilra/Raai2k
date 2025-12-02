import React from "react";
import CeoMessage from "./BannerSection";
import CompanyOverview from "./CompanyOverview";
import StatsSection from "./StatsSection";
import LeadershipSection from "./LeadershipSection";
import CaseStudySection from "../CaseStudies/CaseStudySection";
import BlogsSection from "../Blogs/BlogsSection";
import ClientTestimonials from "../Components/ClientTestimonials";

const AboutPage = () => {
  return (
    <div className="">
      <CeoMessage />
      <CompanyOverview />
      {/* <CaseStudySection /> */}
      <StatsSection />
      {/* <BlogsSection /> */}
      {/* <ClientTestimonials /> */}
      {/* <LeadershipSection /> */}
    </div>
  );
};

export default AboutPage;
