import React from "react";
import CeoMessage from "./BannerSection";
import CompanyOverview from "./CompanyOverview";
import StatsSection from "./StatsSection";
import LeadershipSection from "./LeadershipSection";

const AboutPage = () => {
  return (
    <div className="">
      <CeoMessage />
      <CompanyOverview />
      <StatsSection />
      <LeadershipSection />
    </div>
  );
};

export default AboutPage;
