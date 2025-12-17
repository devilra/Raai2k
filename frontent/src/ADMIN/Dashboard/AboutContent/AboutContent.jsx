import React from "react";
import AboutBanner from "./AboutBanner/AboutBanner";
import AboutCeo from "./AboutCeo/AboutCeo";
import CompanyOverview from "./CompanyOverview/CompanyOverview";

const AboutContent = () => {
  return (
    <div>
      <AboutBanner />
      <AboutCeo />
      <CompanyOverview />
    </div>
  );
};

export default AboutContent;
