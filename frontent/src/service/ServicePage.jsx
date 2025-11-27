import React from "react";
import ServiceHome from "./ServiceHome";
import { ProcessWorkflow } from "./ProcessWorkflow";
import { EngagementModels } from "./EngagementModels";
import { IndustriesWeServe } from "./IndustriesWeServe";

const ServicePage = () => {
  return (
    <div>
      <ServiceHome />
      <ProcessWorkflow />
      <EngagementModels />
      <IndustriesWeServe />
    </div>
  );
};

export default ServicePage;
