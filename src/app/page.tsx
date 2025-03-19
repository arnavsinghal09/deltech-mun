"use client";
import React from "react";

import HeroSection from "../components/custom/HeroSection";
import ConferenceDetails from "../components/custom/conference-details";
import FeaturedBlogs from "../components/custom/featured-blogs";
import { DelTechImageCarousel } from "../components/custom/DelTechImageCarousel";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <ConferenceDetails />

      {/* <HeroSection /> */}
      {/* <DelTechImageCarousel /> */}
      {/* <FeaturedBlogs /> */}
    </div>
  );
}

export default App;
