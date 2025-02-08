"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { FlipWords } from "@/components/ui/flip-words";

export default function HeroSection() {
  const words = ["Diplomats", "Change-Makers", "Visionaries", "Global Leaders"];

  return (
    <div className="relative pt-32 pb-24 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.5) 10%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold max-h-fit text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 animate-text"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Shaping Tomorrow's{" "}
            <FlipWords words={words} className="text-blue-600" /> <br />
          </motion.h1>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-gray-900 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          >
            &Prime;Where Diplomacy Begins&Prime;
          </motion.h2>

          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl min-h-10 mx-auto">
            Join our Model United Nations society and develop essential skills
            in diplomacy, public speaking, and international relations.
          </p>

          <motion.div
            className="flex flex-wrap justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transition flex items-center"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="border border-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-full hover:bg-gray-50 transition shadow-sm"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Artistic Animation with Floating Circles */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-blue-300 opacity-40 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-10 right-20 w-56 h-56 bg-blue-500 opacity-50 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}
