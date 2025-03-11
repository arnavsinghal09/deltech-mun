"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import React from "react";

const committeeData = {
  name: "United Nations Commission on the Status of Women",
  description:
    "The United Nations Commission on the Status of Women (UNCSW) is a global policy-making body dedicated to the promotion of gender equality and the empowerment of women. It plays a crucial role in shaping international standards and policies to advance women's rights.",
  agenda: {
    title:
      "Strengthening Global Efforts to Combat Gender-Based Violence in the Aftermath of Humanitarian Crises with Emerging Migration Trends",
    description:
      "This agenda focuses on addressing the rising incidents of gender-based violence (GBV) in the context of humanitarian crises and global migration trends. Delegates will explore policy interventions, international cooperation, and legal frameworks to enhance protection mechanisms, ensure justice for survivors, and promote gender-sensitive responses in crisis-affected regions.",
  },
  executiveBoard: [
    {
      name: "Kashish Gumber",
      position: "Chairperson",
      bio: "Kashish Gumber",
      image: "/api/placeholder/300/300",
    },
    {
      name: "John Doe",
      position: "Vice-Chairperson",
      bio: "John Doe",
      image: "/api/placeholder/300/300",
    },
  ],
};


// Simple fade-in animation
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function CommitteePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-8">
        {/* Committee Header */}
        <motion.div
          className=" mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-5xl xl:text-7xl font-bold mb-4 text-gray-900">
            {committeeData.name}
          </div>
          <div className="text-md font-light text-gray-600 max-w-3xl">
            {committeeData.description}
          </div>
        </motion.div>

        {/* Agenda Section */}
        <motion.div
          className="mb-20"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="text-3xl font-bold text-gray-900 mb-6">Agenda</div>
          <Card className="relative bg-white/60 border-gray-200 shadow-md overflow-hidden mb-8">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://mun-website-images.s3.ap-south-1.amazonaws.com/uncsw-image.jpg')",
                filter: "brightness(40%)",
              }}
            />
            <div className="relative p-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  {committeeData.agenda.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-200">
                  {committeeData.agenda.description}
                </p>
                <div className="mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Download Background Guide
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Executive Board Section */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Executive Board
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {committeeData.executiveBoard.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card className="bg-white border-gray-200 shadow-md h-full">
                  <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <p className="text-blue-600 font-medium">
                      {member.position}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
