import React from "react";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import { Button } from "@/components/ui/button";

const ConferenceDetails = () => {
  return (
    <div className="max-w-7xl py-20 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          DelTech MUN 2025
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Step into an unparalleled experience where diplomacy meets innovation.
          Join future leaders and changemakers at Delhi Technological University
          this March.
        </p>
      </div>

      <div className="text-left max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Conference Highlights
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Dates:</strong> April 19-20, 2025
          </li>
          <li>
            <strong>Format:</strong> In-Person at Delhi Technological University
          </li>
          <li>
            <strong>Focus:</strong> Addressing Global Challenges through Debate
            and Diplomacy
          </li>
          <li>
            <strong>Delegates:</strong> Network with passionate participants
            from around the globe
          </li>
          <li>
            <strong>Special Sessions:</strong> Workshops and Expert Panels on
            International Relations
          </li>
        </ul>

        <motion.div
          className="absolute bottom-40 left-20 w-40 h-40 bg-blue-300 opacity-40 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-40 left-20 w-56 h-56 bg-blue-500 opacity-50 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Why You Should Attend
          </h3>
          <p className="text-gray-600">
            Engage in thought-provoking debates, hone your public speaking
            skills, and contribute to meaningful discussions on some of the
            world&apos;s most pressing issues. DelTech MUN 2025 is your platform
            to make a difference.
          </p>
        </div>
        <motion.div
          className="absolute top-40 right-20 w-40 h-40 bg-blue-300 opacity-40 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute top-40 right-20 w-56 h-56 bg-blue-500 opacity-50 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <CountdownTimer />
        <div className="mt-12 text-center">
          <Button className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetails;
