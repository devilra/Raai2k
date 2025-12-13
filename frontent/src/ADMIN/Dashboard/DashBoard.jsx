// src/pages/DashBoard.js (அல்லது உங்கள் பாதைக்கு ஏற்ப)

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../adminComponents/Sidebar";
import Header from "../adminComponents/Header";

const DashBoard = () => {
  // Sidebar-ன் அகலம்: w-64
  // Header-ன் உயரம்: h-16
  const sidebarWidthClass = "w-64";
  const headerHeightClass = "h-16";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 1. Left Sidebar (Fixed) */}
      <Sidebar />

      {/* 2. Main Content Wrapper */}
      {/* வலது உள்ளடக்கத்தை Sidebar-ன் அகலத்திற்கு இடது பக்கம் தள்ள 'ml-64' பயன்படுத்தப்பட்டுள்ளது */}
      <div className={`flex-1 ml-64 flex flex-col`}>
        {/* 3. Top Header/Navbar (Fixed) */}
        <Header />

        {/* 4. Scrollable Content Area */}
        {/*
          Navbar-ன் உயரத்திற்கு (h-16) மேல் உள்ளடக்கத்தைத் தள்ள 'pt-16' பயன்படுத்தப்பட்டுள்ளது.
          இப்போது, இந்த Div-க்குள் உள்ள அனைத்தும் Navbar-க்கு கீழே Scroll ஆகும்.
        */}
        <main className={`flex-1 p-6 pt-16`}>
          {/*
            இங்கே தான் உங்கள் ரூட்டிங் உள்ளடக்கமான (Dashboard Home, Movies Page போன்றவை) காட்டப்படும்.
            உள்ளடக்கத்தை அதிகமாக்கி பார்த்தால், 'main' area மட்டும் scroll ஆகும்.
          */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
