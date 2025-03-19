import Link from "next/link";
import { DeltechBlack } from "../../../public /logos/deltech-black";
import { currentUser } from "@clerk/nextjs/server";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

import RedirectButtonClient from "./redirect-button-client";
import React from "react";
import { UserDropdown } from "./UserDropdown";
import { DialogTitle } from "@radix-ui/react-dialog";

export default async function Header() {
  const user = await currentUser();

  return (
    <div className="w-full bg-gradient-to-r from-blue-100 via-white to-blue-100 backdrop-blur-sm z-50 border-b border-b-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={"/"} className="flex items-center space-x-2">
            <DeltechBlack className="h-36 w-36" />
          </Link>
          <div className="hidden md:flex md:space-x-8 lg:space-x-12 space-x-16">
            {[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: "Members", href: "/members" },
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
            <div className="flex  space-x-4">
              <DialogBar className="md:hidden" />
              <UserDropdown />
            </div>
          ) : (
            <>
              <DialogBar className="md:hidden" />
              <a
                href=" https://forms.gle/utvTMSG6oKGPpzYX8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-full bg-blue-600" variant="default">Register Now</Button>
              </a>
              {/* <RedirectButtonClient
                path="/auth/signin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register Now
              </RedirectButtonClient> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function DialogBar({ className }: { className?: string }) {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Members", href: "/members" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogTitle>{``}</DialogTitle>
      <DialogContent className="max-w-[300px] rounded-xl flex flex-col space-y-4 backdrop-blur-xl bg-background/80 shadow-lg p-6 border">
        <div className="flex flex-col items-center space-y-4">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-lg font-medium text-primary hover:text-primary-focus transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
