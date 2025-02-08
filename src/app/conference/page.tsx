"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/custom/CountdownTimer";
import { motion } from "framer-motion";
import CommitteeCard from "@/components/custom/committee-card";

export default function ConferencePage() {
  const committees = [
    {
      name: "UNGA",
      imagePath: "/images/unga.png",
      details:
        "The United Nations General Assembly (UNGA) is the main deliberative, policymaking, and representative body of the UN.",
    },
    {
      name: "UNHRC",
      imagePath: "/images/unhrc.png",
      details:
        "The United Nations Human Rights Council (UNHRC) addresses human rights violations and promotes the protection of fundamental freedoms worldwide.",
    },

    {
      name: "UNCSW",
      imagePath: "/images/uncsw.png",
      details:
        "The United Nations Commission on the Status of Women (UNCSW) promotes gender equality and the empowerment of women globally.",
    },

    {
      name: "AIPPM",
      imagePath: "/images/aippm.png",
      details:
        "The All India Political Parties Meet (AIPPM) is a platform for political representatives to discuss national issues.",
    },
    {
      name: "Lok Sabha",
      imagePath: "/images/lok-sabha.png",
      details:
        "The Lok Sabha is the lower house of the Parliament of India, responsible for making laws and overseeing the executive.",
    },
    {
      name: "International Press",
      imagePath: "/images/press.png",
      details:
        "This committee focuses on the role of the press in promoting freedom of speech, democracy, and ethical journalism worldwide.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <CountdownTimer />

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">About the Conference</h2>
        <p className="text-lg mb-4">
          Join us for three days of intense debate, diplomacy, and global
          problem-solving at our annual MUN Conference. This year's theme is
          "Sustainable Development in a Post-Pandemic World," focusing on the
          challenges and opportunities that lie ahead as we rebuild and reshape
          our global society.
        </p>
        <Button asChild size="lg">
          <Link href="#register">Register Now</Link>
        </Button>
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Committees</h2>
        {/* Add a detailed schedule here */}
      </section>
      <div className=" ">
        <motion.div
          key="senior-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {" "}
          {committees.map((committee, index) => (
            <CommitteeCard key={index} committee={committee} />
          ))}
        </motion.div>
      </div>
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Keynote Speakers</h2>
        {/* Add information about keynote speakers here */}
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">
          Previous Conference Highlights
        </h2>
        {/* Add highlights from previous conferences here */}
      </section>

      <section id="register" className="my-12">
        <h2 className="text-3xl font-bold mb-6">Registration</h2>
        {/* Add registration form or link to registration page here */}
      </section>

      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Sponsorship Opportunities</h2>
        <p className="text-lg mb-4">
          Interested in sponsoring our conference? We offer various sponsorship
          packages that provide excellent visibility and networking
          opportunities for your organization.
        </p>
        <Button asChild>
          <Link href="/sponsor">Learn More About Sponsorship</Link>
        </Button>
      </section>
    </div>
  );
}
