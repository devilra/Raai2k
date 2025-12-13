import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ServicePage from "./service/ServicePage";
import AboutPage from "./About/AboutPage";
import ContactPage from "./Contact/ContactPage";
import Solutions from "./Solutions/Solutions";
import Faq from "./FAQ/Faq";
import ScrollToTop from "./Components/ScrollToTop";
import CaseStudies from "./CaseStudies/CaseStudies";
import Blogs from "./Blogs/Blogs";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfUse from "./Components/TermsOfUse";
import Careers from "./Careers/Careers";
import NewsDetails from "./LatestNews/NewsDetails";
import DashBoard from "./ADMIN/Dashboard/DashBoard";
import Login from "./ADMIN/Login";
import DashboardHome from "./ADMIN/Dashboard/DashboardHome";
import HomePageContent from "./ADMIN/Dashboard/HomeContent/HomePageContent";
import ServiceContent from "./ADMIN/Dashboard/ServiceContent/ServiceContent";
import SolutionContent from "./ADMIN/Dashboard/SolutionContent/SolutionContent";
import AdminProtect from "./ADMIN/adminComponents/AdminProtect";

const App = () => {
  const location = useLocation();

  // /admin... start aana route ku navbar & footer hide
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/auth");

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solution" element={<Solutions />} />
        {/* <Route path="/case" element={<CaseStudies />} /> */}
        {/* <Route path="/blog" element={<Blogs />} /> */}
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/faq" element={<Faq />} /> */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/news/:id" element={<NewsDetails />} />

        <Route path="/auth/login" element={<Login />} />

        {/* 2. 🛡️ Protected Routes - AdminProtect Component-ஐப் பயன்படுத்துதல் */}
        {/* /admin path-ஐ அணுகும் முன் AdminProtect சரிபார்க்கும். */}
        <Route path="/admin" element={<AdminProtect />}>
          {/* AdminProtect-இல் இருந்து அனுமதி கிடைத்தவுடன், Outlet மூலம் DashBoard Component-க்கு அனுப்பப்படும் */}
          <Route path="" element={<DashBoard />}>
            {/* DashBoard Component-இன் உள்ளே Nested Routes */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="home" element={<HomePageContent />} />
            <Route path="serviceContent" element={<ServiceContent />} />
            <Route path="solutionContent" element={<SolutionContent />} />
          </Route>
        </Route>
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
