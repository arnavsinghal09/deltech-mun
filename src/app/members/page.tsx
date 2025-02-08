"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
import { FocusCards } from "@/components/ui/focus-cards";

const administrative = [{
      name: "Jane Doe",
      role: "President",
      description: "Jane is the president of the club and has a passion for international relations and diplomacy.",
      src: "/members/jane-doe.jpg",
    },
    {
      name: "John Smith",
      role: "Vice President",
      description: "John is the vice president of the club and has a passion for international relations and diplomacy.",
      src: "/members/john-smith.jpg",
    },
    {
      name: "Emily Brown",
      role: "Secretary",
      description: "Emily is the secretary of the club and has a passion for international relations and diplomacy.",
      src: "/members/emily-brown.jpg",
    }]


  const senior = [{
      name: "Michael Johnson",
      role: "Senior Delegate",
      description: "Michael is a senior delegate with a passion for international relations and diplomacy.",
      src: "/members/michael-johnson.jpg",
    },
    {
      name: "Sarah Williams",
      role: "Senior Delegate",
      description: "Sarah is a senior delegate with a passion for international relations and diplomacy.",
      src: "/members/sarah-williams.jpg",
    },
    {
      name: "David Lee",
      role: "Senior Delegate",
      description: "David is a senior delegate with a passion for international relations and diplomacy.",
      src: "/members/david-lee.jpg",
    },
    {
      name: "Lisa Chen",
      role: "Senior Delegate",
      description: "Lisa is a senior delegate with a passion for international relations and diplomacy.",
      src: "/members/lisa-chen.jpg",
    },
  ]

  const junior = [
    {
      name: "Alex Turner",
      role: "Junior Delegate",
      description: "Alex is a junior delegate with a passion for international relations and diplomacy.",
      src: "/members/alex-turner.jpg",
    },
    {
      name: "Olivia Martinez",
      role: "Junior Delegate",
      description: "Olivia is a junior delegate with a passion for international relations and diplomacy.",
      src: "/members/olivia-martinez.jpg",
    },
    {

      name: "Ryan Patel",
      role: "Junior Delegate",
      description: "Ryan is a junior delegate with a passion for international relations and diplomacy.",
      src: "/members/ryan-patel.jpg",
    },
    {
      name: "Sophi  e Kim",
      role: "Junior Delegate",
      description: "Sophie is a junior delegate with a passion for international relations and diplomacy.",
      src: "/members/sophie-kim.jpg",
    },
    {

      name: "Daniel Garcia",
      role: "Junior Delegate",
      description: "Daniel is a junior delegate with a passion for international relations and diplomacy.",
      src: "/members/daniel-garcia.jpg",
    },
  ]


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
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="administrative">
              Administrative Council
            </TabsTrigger>
            <TabsTrigger value="senior">Senior Council</TabsTrigger>
            <TabsTrigger value="junior">Junior Council</TabsTrigger>
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
