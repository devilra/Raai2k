import React from "react";
import CeoMessage from "./BannerSection";
import CompanyOverview from "./CompanyOverview";
import StatsSection from "./StatsSection";
import LeadershipSection from "./LeadershipSection";
import CaseStudySection from "./CaseStudySection";

const AboutPage = () => {
  return (
    <div className="">
      <CeoMessage />
      <CompanyOverview />
      <CaseStudySection />
      <StatsSection />
      {/* <LeadershipSection /> */}
    </div>
  );
};

export default AboutPage;
