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
    name: "Dhruv Rustagi",
    role: "President",
    src: "/members/jane-doe.jpg",
  },
  {
    name: "Arin Singhal",
    role: "Vice President",
    src: "/members/jane-doe.jpg",
  },
  {
    name: "Sanskar Srivastava",
    role: "Chief Advisor",
    src: "/members/jane-doe.jpg",
  },
];

const senior = [
  {
    name: "Michael Johnson",
    role: "Senior Delegate",
    description:
      "Michael is a senior delegate with a passion for international relations and diplomacy.",
    src: "/members/michael-johnson.jpg",
  },
  {
    name: "Sarah Williams",
    role: "Senior Delegate",
    description:
      "Sarah is a senior delegate with a passion for international relations and diplomacy.",
    src: "/members/sarah-williams.jpg",
  },
  {
    name: "David Lee",
    role: "Senior Delegate",
    description:
      "David is a senior delegate with a passion for international relations and diplomacy.",
    src: "/members/david-lee.jpg",
  },
  {
    name: "Lisa Chen",
    role: "Senior Delegate",
    description:
      "Lisa is a senior delegate with a passion for international relations and diplomacy.",
    src: "/members/lisa-chen.jpg",
  },
];

const junior = [
  {
    name: "Anjan Anand",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Anjan+Anand.png",
  },
  {
    name: "Anukesh Singh",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Anukesh.jpg",
  },
  {
    name: "Arnav Singhal",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Arnav.jpg",
    linkedin: "https://www.linkedin.com/in/arnavsinghal09",
  },
  {
    name: "Himanshu Sharma",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Himanshu.webp",
    linkedin: "https://www.linkedin.com/in/himanshu-sharma-2183a429b/",
  },
  {
    name: "Raghav Garg",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Raghav.png",
    linkedin: "https://www.linkedin.com/in/raaghavgarg/",
  },
  {
    name: "Tanmay Solanki",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Tanmay.JPG",
    linkedin: "https://www.linkedin.com/in/tanmay-solanki-b6b385220/",
  },
  {
    name: "Khush Chawla",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Khush.jpg",
    linkedin: "https://www.linkedin.com/in/khush-chawla-4b6321299/",
  },
  {
    name: "Rishita Sinha",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Rishita.jpg",
    linkedin: "https://www.linkedin.com/in/rishita-sinha-2957262a4/",
  },
  {
    name: "Nikunj Sharma",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Nikunj+Sharma.jpeg",
    linkedin: "https://www.linkedin.com/in/nikunj-sharma-183862289",
  },
  {
    name: "Satyam Kumar",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Satyam.png",
    linkedin: "https://www.linkedin.com/in/satyam-kumar-711b54150/",
  },
  {
    name: "Pushpa Shikhar Singh",
    role: "Junior Council",
    src: "/members/daniel-garcia.jpg",
    linkedin: "https://www.linkedin.com/in/pushpa-shikhar-singh-709894212/",
  },
  {
    name: "Soumya Shekhar",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Soumya.jpg",
    linkedin: "https://www.linkedin.com/in/soumya-shekhar-973039287",
  },
  {
    name: "Keshav Bajaj",
    role: "Junior Council",
    src: "/members/daniel-garcia.jpg",
  },
  {
    name: "Parth Malik",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Parth.HEIC",
    linkedin: "https://www.linkedin.com/in/parth-malik-676966286/",
  },
  {
    name: "Tisha Gupta",
    role: "Junior Council",
    src: "/members/daniel-garcia.jpg",
  },
  {
    name: "Atiyab",
    role: "Junior Council",
    src: "/members/daniel-garcia.jpg",
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
