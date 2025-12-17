import React from "react";
import SolutionBanner from "./SolutionBanner/SolutionBanner";
import OurSolution from "./OurSolution/OurSolution";
import OurProcess from "./OurProcess/OurProcess";
import Expertise from "./Expertise/Expertise";

const SolutionContent = () => {
  return (
    <div>
      <SolutionBanner />
      <OurSolution />
      <Expertise />
      <OurProcess />
    </div>
  );
};

export default SolutionContent;
