import React from "react";
import ServiceHome from "./ServiceHome";
import { ProcessWorkflow } from "./ProcessWorkflow";
import { EngagementModels } from "./EngagementModels";
import { IndustriesWeServe } from "./IndustriesWeServe";
import Faq from "../FAQ/Faq";

const ServicePage = () => {
  return (
    <div>
      <ServiceHome />
      <ProcessWorkflow />
      <EngagementModels />
      <IndustriesWeServe />
      <Faq />
    </div>
  );
};

export default ServicePage;
