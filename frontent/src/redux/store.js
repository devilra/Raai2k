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
  },
});
