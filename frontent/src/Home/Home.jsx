import React from "react";
import Banner from "./Banner";
import WelcomeSection from "./WelcomeSection";
import VideoSection from "./VideoSection";
import OurServices from "./OurServices";
import WhyChoose from "./WhyChoose";
import ThingsYouGet from "./ThingsYouGet";
import ContactRequest from "./ContactRequest";
import GlobalLeadership from "./GlobalLeadership";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <WelcomeSection />
      <VideoSection />
      <OurServices />
      <WhyChoose />
      <ThingsYouGet />
      <ContactRequest />
      <GlobalLeadership />

      <section className="h-screen flex flex-col justify-center items-center  from-blue-100 to-white">
        <h1 className="text-5xl font-bold text-[#223058] mb-4">Home Page</h1>
        <p className="text-xl text-gray-600">
          Scroll down to test the Sticky Navbar 👇
        </p>
      </section>

      {/* Extra Section – Just to Enable Scrolling */}
      <section className="h-[120vh] bg-gray-100 flex justify-center items-center">
        <h2 className="text-3xl text-gray-700">Scrolling Section</h2>
      </section>
    </div>
  );
};

export default Home;
