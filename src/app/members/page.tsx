"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { FocusCards } from "../../components/ui/focus-cards";
import { link } from "fs";

const administrative = [
  {
    name: "Evam Bansal",
    role: "President",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Evam.jpg",
  },
  {
    name: "Khyati Tuli",
    role: "Vice President",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Khyati.jpg",
  },
  {
    name: "Pari Jain",
    role: "Chief Advisor",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Pari.jpg",
  },
];

const senior = [
  {
    name: "Tanmay Solanki",
    role: "Director of MUN",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Tanmay.JPG",
    linkedin: "https://www.linkedin.com/in/tanmay-solanki-b6b385220/"
  },
  {
    name: "Arnav Singhal",
    role: "Director of External Affairs & Cross Delegations",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Arnav.jpg",
    linkedin: "https://www.linkedin.com/in/arnavsinghal09"
  },
  {
    name: "Nikunj Sharma",
    role: "Director of Internal Affairs",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Nikunj+Sharma.jpeg",
    linkedin: "https://www.linkedin.com/in/nikunj-sharma-183862289"
  },
  {
    name: "Satyam Kumar",
    role: "Director of Administration",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Satyam.png",
    linkedin: "https://www.linkedin.com/in/satyam-kumar-711b54150/"
  },
  {
    name: "Raghav Garg",
    role: "Director of Design",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Raghav.png",
    linkedin: "https://www.linkedin.com/in/raaghavgarg/"
  },
  // {
  //   name: "Prabal Wadhwa",
  //   role: "Director of PR & Publicity",
  //   src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Raghav.png",
  // },
  {
    name: "Himanshu Sharma",
    role: "Director of Corporate Affairs",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Himanshu.webp",
    linkedin: "https://www.linkedin.com/in/himanshu-sharma-2183a429b/"
  },
  {
    name: "Atiyab Ahmed",
    role: "Director of Corporate Affairs",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/atiyab.jpg",
  }
];

const junior = [
  {
    name: "Aditya Saxena",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/2026/jc-photos/aditya.jpeg",
  },
  {
    name: "Anish Dash",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/2026/jc-photos/anish.jpeg",
  },
  {
    name: "Archit",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/2026/jc-photos/archit.jpeg",
    
  },
  {
    name: "Armaan Kumar",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/2026/jc-photos/armaan.png",
    
  },
  {
    name: "Harshit Agarwal",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/2026/jc-photos/harshit.jpeg",
    
  },
  {
    name: "Kabir Gambhir",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/2026/jc-photos/kabir.jpeg",
    
  },
  {
    name: "Prakhar Goel",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/2026/jc-photos/prakhar.jpeg",
  },
  {
    name: "Vinay Meena",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/2026/jc-photos/vinay.jpeg",
    
  },
];

export default function MembersPage() {
  const [activeTab, setActiveTab] = useState("administrative");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="container mx-auto">
        <div className="text-4xl font-bold text-center mb-12 text-blue-800">
          Our Members
        </div>

        <Tabs
          defaultValue={activeTab}
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full bg-gray-100 flex flex-wrap justify-center gap-2 sm:grid sm:grid-cols-3">
            <TabsTrigger
              value="administrative"
              className="flex-1 min-w-[120px]"
            >
              Administrative Council
            </TabsTrigger>
            <TabsTrigger value="senior" className="flex-1 min-w-[120px]">
              Senior Council
            </TabsTrigger>
            <TabsTrigger value="junior" className="flex-1 min-w-[120px]">
              Junior Council
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait" initial={false}>
            {activeTab === "administrative" && (
              <TabsContent value="administrative" className="mt-10">
                <motion.div
                  key="administrative-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FocusCards cards={administrative} />
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "senior" && (
              <TabsContent value="senior" className="mt-10">
                <motion.div
                  key="senior-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FocusCards cards={senior} />
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "junior" && (
              <TabsContent value="junior" className="mt-10">
                <motion.div
                  key="junior-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FocusCards cards={junior} />
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
}
