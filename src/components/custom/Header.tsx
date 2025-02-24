import Link from "next/link";
import { DeltechBlack } from "../../../public /logos/deltech-black";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

import RedirectButtonClient from "./redirect-button-client";
import React from "react";
import { UserDropdown } from "./UserDropdown";

export default async function Header() {
  const user = await currentUser();

  console.log("Hehehe", user);

  return (
    <div className="w-full bg-gradient-to-r from-blue-100 via-white to-blue-100 backdrop-blur-sm z-50 border-b border-b-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={"/"} className="flex items-center space-x-2">
            <DeltechBlack className="h-36 w-36" />
          </Link>
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Home", href: "/" },
              { name: "Conferences", href: "/conference" },
              { name: "Blog", href: "/blog" },
              { name: "Members", href: "/members" },
              { name: "About", href: "/" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out"></span>
              </Link>
            ))}
          </div>
          {user ? (
            <UserDropdown />
            // <UserButton
            //   appearance={{
            //     elements: { root: "custom-user-button" },
            //   }}
            // />
          ) : (
            <RedirectButtonClient
              path="/auth/signin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register Now
            </RedirectButtonClient>
          )}
        </div>
      </div>
    </div>
  );
}
