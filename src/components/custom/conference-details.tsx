import React from "react";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import { Button } from "../ui/button";
import CommitteeCards from "./CommitteeCards";
// import ImageCarousel from "./ImageCarousel";
import {
  ArrowRight,
  CalendarIcon,
  MapPinIcon,
  SpeakerIcon,
  UsersIcon,
} from "lucide-react";
import { FlipWords } from "../ui/flip-words";
import Carousel from "../ui/carousel";
import CampusAmbassadorProgram from "./CampusAmbassador";
import Image from "next/image";

const ConferenceDetails = () => {
  const words = ["Diplomats", "Change-Makers", "Visionaries", "Global Leaders"];
  const portfolioSheetUrl = "https://docs.google.com/spreadsheets/d/1DI66i6bnICdUUb3qMv361aq3lSpVQric17DG1dyPpWQ/edit?usp=sharing";

  function DelTechImageCarousel() {
    const slideData = [
      {
        src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/mun-pics/IMG_8713.jpg",
        alt: "DelTech MUN Event 1",
      },
      {
        src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/mun-pics/DSC08400.jpg",
        alt: "DelTech MUN Event 2",
      },
      {
        src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/mun-pics/DSC08044.jpg",
        alt: "DelTech MUN Event 3",
      },
    ];

    return (
      <div className="relative overflow-hidden w-full h-full py-20">
        <div className="ml-32">
          <div className="text-4xl font-bold m-6">Highlights</div>
        </div>
   
        <Carousel slides={slideData} />

        <motion.div
          className="absolute top-10 right-10 w-40 h-40 bg-blue-300 opacity-40 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-10 right-20 w-56 h-56 bg-blue-500 opacity-50 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-blue-300 opacity-40 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute top-20 left-10 w-56 h-56 bg-blue-500 opacity-50 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl py-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent  mb-10"
          >
            DelTech MUN 2026
          </motion.div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold max-h-fit  mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 animate-text"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Shaping Tomorrow's{" "}
                <FlipWords words={words} className="text-blue-600" /> <br />
              </motion.h1>

              <motion.h2
                className="text-xl sm:text-2xl md:text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-gray-900 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
              >
                &Prime;Where Diplomacy Begins&Prime;
              </motion.h2>

              <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl min-h-10 mx-auto">
                Step into an unparalleled experience where diplomacy meets
                innovation. Join future leaders and changemakers at Delhi
                Technological University this April.
              </p>
            </motion.div>
          </div>
        </div>
        <CountdownTimer />

        <div className="relative w-full overflow-hidden rounded-xl px-6 py-12 md:p-12">
          {/* Animated Backgrounds */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-blue-300 opacity-30 rounded-full blur-3xl -z-10"
            animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400 opacity-20 rounded-full blur-3xl -z-10"
            animate={{ y: [0, -40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Key Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            <div className=" bg-white/70 backdrop-blur-sm p-4 rounded-lg flex items-center gap-3 shadow-md">
              <CalendarIcon className="text-blue-600 w-6 h-6" />
              <div>
                <p className="font-semibold">31st Jan and 1st Feb, 2026</p>
                <p className="text-sm text-gray-500">Mark your calendar</p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg flex items-center gap-3 shadow-md">
              <MapPinIcon className="text-blue-600 w-6 h-6" />
              <div>
                <p className="font-semibold">Delhi Technological University</p>
                <p className="text-sm text-gray-500">In-person event</p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg flex items-center gap-3 shadow-md lg:col-span-1 md:col-span-2">
              <UsersIcon className="text-blue-600 w-6 h-6" />
              <div>
                <p className="font-semibold">Global Delegates Network</p>
                <p className="text-sm text-gray-500">
                  Connect with passionate participants
                </p>
              </div>
            </div>
          </div>

          {/* Committee Cards Placeholder */}
          <div className="mb-10">
            <CommitteeCards />
          </div>

          {/* Why Attend */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-10">
            <h2 className="text-2xl font-bold mb-2">Why Attend</h2>
            <p className="mb-4">
              Engage in thought-provoking debates, hone your public speaking
              skills, and contribute to meaningful discussions on pressing
              global issues. DelTech MUN 2026 is your platform to make a
              difference.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Skill Development
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Networking
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Global Perspective
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Expert Workshops
              </span>
            </div>
          </div>

          {/* Special Sessions */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-10 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Special Sessions
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <p className="font-medium">
                  Expert Panels on International Relations
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <p className="font-medium">
                  Public Speaking & Negotiation Workshops
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <p className="font-medium">Diplomatic Crisis Simulation</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <Button className="w-full max-w-48 sm:max-w-60 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-md sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Register Now
              </Button>
              <Button
                asChild
                variant="register"
                className="w-full max-w-48 sm:max-w-60 bg-white text-black px-8 py-6  text-md sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href={portfolioSheetUrl} target="_blank" rel="noopener noreferrer">
                  View Portfolio Matrix
                </a>
              </Button>
            </div>
          </div>
          <CampusAmbassadorProgram />
        </div>
      </div>
      <div>
        <DelTechImageCarousel />
      </div>

      <motion.div
        className="absolute top-10 right-10 w-40 h-40 bg-blue-300 opacity-40 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-10 right-20 w-56 h-56 bg-blue-500 opacity-50 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-blue-300 opacity-40 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-56 h-56 bg-blue-500 opacity-50 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
};

export default ConferenceDetails;
