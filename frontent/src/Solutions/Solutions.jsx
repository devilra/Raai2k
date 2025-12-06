import React from "react";
import SolutionsHero from "./SolutionsHero";
import SolutionsList from "./SolutionsList";
import ExpertiseSection from "./ExpertiseSection";
import ProcessWorkflow from "./ProcessWorkflow";
import IndustriesWeServe from "./IndustriesWeServe";
import CaseStudySection from "./CaseStudySection";
import Accelerators from "./Accelerators";

const Solutions = () => {
  return (
    <div>
      <SolutionsHero />
      <SolutionsList />
      <ExpertiseSection />
      <Accelerators />
      <ProcessWorkflow />
      {/* <IndustriesWeServe /> */}
      {/* <CaseStudySection /> */}
    </div>
  );
};

export default Solutions;
