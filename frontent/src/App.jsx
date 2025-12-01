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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
