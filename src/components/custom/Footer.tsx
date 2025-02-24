import React from "react";
import { DeltechWhite } from "../../../public /logos/deltech-white";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gray-900 text-white py-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <DeltechWhite className="h-12 w-36" />
            </div>
            <p className="text-gray-400">
              Empowering the next generation of global leaders through diplomacy
              and debate.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <div className="font-bold mb-4">Quick Links</div>
            <div className="space-y-2 text-gray-400">
              {[
                { name: "Home", path: "#" },
                { name: "About Us", path: "#" },
                { name: "Conferences", path: "#" },
                { name: "Blog", path: "#" },
              ].map((link, index) => (
                <div key={index}>
                  <Link href={link.path} className="hover:text-white">
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Contact Information */}
          <div className="flex w-max space-x-10">
            <div>
              <div className="font-bold mb-4">Contact</div>
              <div className="space-y-2 text-gray-400">
                <div>
                  Email:{" "}
                  <a
                    href="mailto:info@munsociety.org"
                    className="hover:text-white"
                  >
                    info@deltech.org
                  </a>
                </div>
                <div>Phone: (555)69696969</div>
              </div>
            </div>

            <div>
              {/* Map Section */}
              <div className="max-w-sm">
                <div className="font-bold mb-4">Location</div>
                <div className="text-gray-400 mb-4 whitespace-normal">
                  Delhi Technological University, Bawana Rd, Shahbad Daulatpur
                  Village, Rohini, New Delhi, Delhi, 110042
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.8989722895094!2d77.1179934151103!3d28.749865082375023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03f2c2b4c219%3A0xb2f0d4aa3ba63a02!2sDelhi%20Technological%20University!5e0!3m2!1sen!2sin!4v1682768714739!5m2!1sen!2sin"
                  width="90%"
                  height="200"
                  className="rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <div>&copy; 2024 MUN Society. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
