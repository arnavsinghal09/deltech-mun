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
  name: "All India Political Parties Meet",
  description:
    "AIPPM serves as a platform for representatives from various political parties in India to discuss and debate pressing national issues. It allows for an exchange of viewpoints on policies, governance, and legislative measures, influencing decision-making at the highest level.",
  agenda: {
    title:
      "Trajectory of Centre-State relations in the past decade with special emphasis on Fiscal Federalism.",
    description:
      "This agenda aims to analyze the evolving dynamics between the central and state governments over the past decade, with a particular focus on fiscal federalism. Discussions will explore revenue sharing, GST implementation, financial autonomy of states, and the role of institutions like the Finance Commission and GST Council in shaping fiscal policies.",
  },
  executiveBoard: [
    {
      name: "Mr. Akshat Mohan Awasthy",
      position: "Chairperson",
      bio: "Akshat Mohan Awasthi",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Mr. Saksham Tuteja",
      position: "Vice Chairperson",
      bio: "Mr. Saksham Tuteja",
      image:
        "https://mun-website-images.s3.ap-south-1.amazonaws.com/eb-photos/Saksham.jpeg",
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
      <div className="max-w-6xl mx-auto px-8">
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
          <div className="text-md font-light text-gray-600 max-w-4xl">
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
                  "url('https://mun-website-images.s3.ap-south-1.amazonaws.com/aippm-image.webp')",
                filter: "brightness(50%)", // Adjust for transparency effect
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
