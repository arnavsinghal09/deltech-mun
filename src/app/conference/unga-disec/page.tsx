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
  name: "United Nations General Assembly",
  subCommittee: "Disarmament and International Security Committee",
  description:
    "The Disarmament and International Security Committee (DISEC) is the First Committee of the United Nations General Assembly, tasked with addressing global security and disarmament issues. It plays a crucial role in discussions on arms control, non-proliferation, and conflict resolution.",
  agenda: {
    title:
      "Discussing Ceasefire Mechanism and Disarmament Strategies for Sustainable Peace with a Special Focus on the Russia-Ukraine Conflict",
    description:
      "This agenda aims to facilitate discussions on effective ceasefire mechanisms and disarmament strategies to ensure long-term peace in conflict zones, with a special emphasis on the ongoing Russia-Ukraine conflict. Delegates will explore diplomatic solutions, arms reduction policies, and the role of international organizations in enforcing peace agreements.",
  },
  executiveBoard: [
    {
      name: "Mr. Ishaan Jain",
      position: "Chairperson",
      bio: "Ishaan Jain",
      image:
        "https://mun-website-images.s3.ap-south-1.amazonaws.com/eb-photos/Ishan.jpeg",
    },
    {
      name: "Mr. Ranjeet Hudda",
      position: "Vice-Chairperson",
      bio: "Mr. Ranjeet Hudda",
      image:
        "https://mun-website-images.s3.ap-south-1.amazonaws.com/eb-photos/Ranjeet.jpg",
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
          <div className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
            {committeeData.subCommittee}
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
                  "url('https://mun-website-images.s3.ap-south-1.amazonaws.com/russia-ukraine-1.jpg')",
                filter: "brightness(40%)", // Adjust for transparency effect
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
                  <div className="relative h-96 w-full overflow-hidden rounded-t-lg">
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
