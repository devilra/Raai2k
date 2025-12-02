import React from "react";
import SolutionsHero from "./SolutionsHero";
import SolutionsList from "./SolutionsList";
import ExpertiseSection from "./ExpertiseSection";
import ProcessWorkflow from "./ProcessWorkflow";
import IndustriesWeServe from "./IndustriesWeServe";

const Solutions = () => {
  return (
    <div>
      <SolutionsHero />
      <SolutionsList />
      <ExpertiseSection />
      <ProcessWorkflow />
      <IndustriesWeServe />
    </div>
  );
};

export default Solutions;
