"use client";
import React from "react";
import Carousel from "../ui/carousel";

export function DelTechImageCarousel() {
  const slideData = [
    {
      src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/mun-pics/IMG_8713.jpg",
    },
    {
      src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/mun-pics/DSC08400.jpg",
    },

    {
      src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/mun-pics/DSC08044.jpg",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <Carousel slides={slideData} />
    </div>
  );
}
