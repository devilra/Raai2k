import React from "react";
import AboutBanner from "./AboutBanner/AboutBanner";
import AboutCeo from "./AboutCeo/AboutCeo";
import CompanyOverview from "./CompanyOverview/CompanyOverview";
import GlobalLeadership from "./GlobalLeadership/GlobalLeadership";
import OurApproach from "./OurApproach/OurApproach";

const AboutContent = () => {
  return (
    <div>
      <AboutBanner />
      <AboutCeo />
      <CompanyOverview />
      {/* <OurApproach /> */}
      <GlobalLeadership />
    </div>
  );
};

export default AboutContent;
