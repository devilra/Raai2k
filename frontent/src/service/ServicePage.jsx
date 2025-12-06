import React from "react";
import ServiceHome from "./ServiceHome";
import { ProcessWorkflow } from "./ProcessWorkflow";
import { EngagementModels } from "./EngagementModels";
import { IndustriesWeServe } from "./IndustriesWeServe";
import Faq from "../FAQ/Faq";
import CaseStudySection from "../Solutions/CaseStudySection";

const ServicePage = () => {
  return (
    <div>
      <ServiceHome />
      <EngagementModels />
      <ProcessWorkflow />
      <CaseStudySection />

      {/* <IndustriesWeServe /> */}
      {/* <Faq /> */}
    </div>
  );
};

export default ServicePage;
