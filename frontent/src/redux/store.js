import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../redux/AdminAuthSlices/adminAuthSlice";
import homeContentReducer from "../redux/AdminHomeSlices/adminHomeSlice";
import WelcomeContent from "../redux/AdminHomeSlices/welcomeContentSlice";
import SolutionBanner from "../redux/AdminSolutionSlices/solutionBannerSlice";
import OurSolutionSection from "../redux/AdminSolutionSlices/OurSolutionSlice";
import OurProcessSection from "../redux/AdminSolutionSlices/OurProcessSlice";
import ExpertiseSection from "../redux/AdminSolutionSlices/ExpertiseSlice";
import AboutBannerSection from "../redux/AdminAboutSlices/aboutBannerSlice";
import AboutCeoSection from "../redux/AdminAboutSlices/aboutCeoSlice";
import AboutCompanyOverview from "../redux/AdminAboutSlices/companyOverviewSlice";
import AboutGlobalLeadership from "../redux/AdminAboutSlices/globalLeadershipSlice";
import AboutOurApproach from "../redux/AdminAboutSlices/ourApproachSlice";
import clientTestimonial from "../redux/AdminHomeSlices/testimonialSlice";
import LatestNews from "../redux/AdminHomeSlices/LatestNewsSlice";
import ThinkYouGet from "../redux/AdminHomeSlices/ThingsYouGetSlice";
import ServiceBanner from "../redux/AdminServiceSlice/ServiceBannerSlice";
import IndustryWeServe from "../redux/AdminServiceSlice/industryServeSlice";
import FintechService from "../redux/AdminServiceSlice/FintechServiceSlice";
import EngagementModel from "../redux/AdminServiceSlice/EngagementSlice";
import CaseStudies from "../redux/AdminServiceSlice/CaseStudySlice";
import VideoContentSlice from "../redux/AdminHomeSlices/videoContentSlice";
import WhyChooseUsSlice from "../redux/AdminHomeSlices/WhyChooseUsSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    homeCarosel: homeContentReducer,
    welcomeContent: WelcomeContent,
    solutionBanner: SolutionBanner,
    ourSolution: OurSolutionSection,
    expertise: ExpertiseSection,
    ourProcess: OurProcessSection,
    aboutBanner: AboutBannerSection,
    ceoContent: AboutCeoSection,
    companyOverview: AboutCompanyOverview,
    ourApproach: AboutOurApproach,
    globalLeadership: AboutGlobalLeadership,
    testimonials: clientTestimonial,
    latestNews: LatestNews,
    thingsYouGet: ThinkYouGet,
    serviceBanner: ServiceBanner,
    industryServe: IndustryWeServe,
    finTech: FintechService,
    engagement: EngagementModel,
    caseStudy: CaseStudies,
    videoContent: VideoContentSlice,
    whyChooseUs: WhyChooseUsSlice,
  },
});
