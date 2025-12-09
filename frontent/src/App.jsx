import React from "react";
import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
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
      </Routes>
      <Footer />
    </>
  );
};

export default App;
