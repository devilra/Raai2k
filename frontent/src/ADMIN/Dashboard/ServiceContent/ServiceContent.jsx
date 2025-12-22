import React, { useEffect, useState } from "react";
import ServiceBanner from "./ServiceBanner/ServiceBanner";
import IndustryWeServe from "./IndustriWeServe/IndustryWeServe";
import FintechService from "./FintechServices/FintechSerice";
import EngagementModel from "./EngagementModel/EngagementModel";
import CaseStudy from "./CaseStudy/CaseStudy";

const ServiceContent = () => {
  return (
    <div>
      <ServiceBanner />
      <IndustryWeServe />
      <FintechService />
      <EngagementModel />
      <CaseStudy />
    </div>
  );
};

export default ServiceContent;
