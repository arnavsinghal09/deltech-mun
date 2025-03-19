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
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/administrative-council/Dhruv.JPG",
  },
  {
    name: "Arin Singhal",
    role: "Vice President",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/administrative-council/Arin.jpg",
  },
  {
    name: "Sanskar Srivastava",
    role: "Chief Advisor",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/administrative-council/Sanskar.JPG",
  },
];

const senior = [
  {
    name: "Mohit Daber",
    role: "Director of MUN",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Mohit.JPG",
  },
  {
    name: "Dev Adlakha",
    role: "Director of Debating",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Dev.jpg",
  },
  {
    name: "Evam Bansal",
    role: "Director of Cross Delegations",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Evam.jpg",
  },
  {
    name: "Prashant Kaushik",
    role: "Director of Public Relations",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Prashant.jpg",
  },
  {
    name: "Ritika Mehar",
    role: "Co-Director of Publicity",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Ritika.jpeg",
  },
  {
    name: "Rachit Singhal",
    role: "Co-Director of Publicity",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Rachit+Singhal.png",
  },
  {
    name: "Pranav Gupta",
    role: "Director of Adminsitration",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Pranav.jpg",
  },
  {
    name: "Shambhavi Singh",
    role: "Director of Internal Affairs",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Shambhavi+Singh.jpg",
  },
  {
    name: "Khyati Tuli",
    role: "Director of Finance and Corporate",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Khyati.jpg",
  },
  {
    name: "Mahatava Ananda",
    role: "Director of Design",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Mahatva.jpg",
  },
  {
    name: "Pari Jain",
    role: "Director of Creation and Illustrations",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Pari.jpg",
  },
  {
    name: "Chaitanya Roy",
    role: "Director of Logistics",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Chaitanya.PNG",
  },
  {
    name: "Nishit Jain",
    role: "Director of Content",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Nishit.jpg",
  },
  {
    name: "Kushal Majumdar",
    role: "Director of Operations",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Kushal.jpg",
  },
  {
    name: "Tushit Kapur",
    role: "Director of External Affairs",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Tushit.png",
  },
  {
    name: "Gaurav Kapoor",
    role: "Director of Social and Outreach",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Gaurav+Kapoor.jpg",
  },
  {
    name: "Rahul Sharma",
    role: "Co-Director of Technical Affairs",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Rahul.jpg",
  },
  {
    name: "Soumya",
    role: "Director of Videography",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/senior-council/Soumya.jpg",
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
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Shikhar.jpg",
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
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Keshav.jpeg",
    linkedin: "https://www.linkedin.com/in/keshav-bajaj-3b7462193/",
  },
  {
    name: "Parth Malik",
    role: "Junior Council",
    src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/council-photos/junior-council/Parth.png",
    linkedin: "https://www.linkedin.com/in/parth-malik-676966286/",
  },
  // {
  //   name: "Tisha Gupta",
  //   role: "Junior Council",
  //   src: "/members/daniel-garcia.jpg",
  // },
  // {
  //   name: "Atiyab",
  //   role: "Junior Council",
  //   src: "/members/daniel-garcia.jpg",
  // },
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
