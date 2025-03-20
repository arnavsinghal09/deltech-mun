import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge"
import { ArrowRight, Award, Users, Star, Gift, Globe } from "lucide-react";

const CampusAmbassadorProgram = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Benefits data
  const benefits = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: "Leadership Certificate",
      description:
        "Official recognition of your leadership and diplomatic skills",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Exclusive Network",
      description: "Connect with diplomats, speakers and fellow ambassadors",
    },
    {
      icon: <Gift className="w-6 h-6 text-emerald-500" />,
      title: "Special Perks",
      description: "Free merchandise, event passes, and promotional materials",
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-500" />,
      title: "Global Exposure",
      description: "Represent your institution on an international platform",
    },
  ];

  return (
    <div className="p-6 md:p-10 rounded-xl overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-300 rounded-full opacity-20 blur-3xl -z-10 -translate-x-1/3 translate-y-1/3" />

      {/* Header */}
      <div className="text-center mb-10">
        <Badge
          variant="outline"
          className="mb-4 px-4 py-1 text-blue-600 border-blue-200 bg-blue-50"
        >
          DelTech MUN 2025
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Campus Ambassador Program
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Represent DelTech MUN at your institution and gain valuable leadership
          experience while expanding your network and earning exclusive rewards.
        </p>
      </div>

      {/* Benefits */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {benefits.map((benefit, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full bg-white/80 backdrop-blur-sm border-none shadow-md hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <div className="mb-2">{benefit.icon}</div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-600 text-sm">{benefit.description}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Responsibilities */}
      <Card className="mb-10 bg-white/90 backdrop-blur-sm border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Ambassador Responsibilities</span>
          </CardTitle>
          <CardDescription>
            What we expect from our campus ambassadors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                <span className="text-blue-600 text-xs font-bold">1</span>
              </div>
              <span className="text-gray-700">
                Promote DelTech MUN 2025 events at your institution
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                <span className="text-blue-600 text-xs font-bold">2</span>
              </div>
              <span className="text-gray-700">
                Recruit delegates from your campus and surrounding areas
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                <span className="text-blue-600 text-xs font-bold">3</span>
              </div>
              <span className="text-gray-700">
                Organize pre-conference workshops and awareness sessions
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                <span className="text-blue-600 text-xs font-bold">4</span>
              </div>
              <span className="text-gray-700">
                Represent DelTech MUN on social media and in campus events
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Application */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Ready to Represent?</h3>
            <p className="opacity-90">
              Applications close on March 15, 2025. Limited positions available.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://unstop.com/internships/campus-ambassador-deltech-model-united-nations-and-debating-society-1433944?lb=q6QA77Xl">
              <Button
                asChild
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Learn More
              </Button>
            </a>
            <Button
              asChild
              className="bg-transparent border-2 border-white hover:bg-white/10"
            >
              <a
                href="https://unstop.com/internships/campus-ambassador-deltech-model-united-nations-and-debating-society-1433944?lb=q6QA77Xl"
                className="flex items-center gap-2"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Resources & Links */}
      {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <a
          href="/ambassador-resources"
          className="p-4 rounded-lg bg-white/70 hover:bg-white transition-all shadow-sm hover:shadow flex flex-col items-center"
        >
          <h4 className="font-semibold text-blue-600 mb-1">
            Ambassador Resources
          </h4>
          <p className="text-sm text-gray-600">
            Access promotional materials & guides
          </p>
        </a>
        <a
          href="/ambassador-faq"
          className="p-4 rounded-lg bg-white/70 hover:bg-white transition-all shadow-sm hover:shadow flex flex-col items-center"
        >
          <h4 className="font-semibold text-blue-600 mb-1">FAQs</h4>
          <p className="text-sm text-gray-600">
            Common questions about the program
          </p>
        </a>
        <a
          href="/contact"
          className="p-4 rounded-lg bg-white/70 hover:bg-white transition-all shadow-sm hover:shadow flex flex-col items-center"
        >
          <h4 className="font-semibold text-blue-600 mb-1">Contact Us</h4>
          <p className="text-sm text-gray-600">
            Reach out to the program coordinators
          </p>
        </a>
      </div> */}
    </div>
  );
};

export default CampusAmbassadorProgram;
