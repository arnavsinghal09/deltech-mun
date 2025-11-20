import Link from "next/link";
import { DeltechBlack } from "../../../public /logos/deltech-black";
import { currentUser } from "@clerk/nextjs/server";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import React from "react";

import { DialogTitle } from "@radix-ui/react-dialog";

// Define the external blog URL
const BLOG_URL = "https://medium.com/@deltech.mun";

export default async function Header2() {
  const user = await currentUser();

  return (
    <div className="w-full bg-gradient-to-r from-blue-100 via-white to-blue-100 backdrop-blur-sm z-50 border-b border-b-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={"/"} className="flex items-center space-x-2">
            <DeltechBlack className="h-36 w-36" />
          </Link>
          <div className="hidden sm:flex sm:space-x-8 lg:space-x-12 space-x-16">
            <Link href="/" className="text-gray-700 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out"></span>
            </Link>
            <a
              href={BLOG_URL}
              className="text-gray-700 relative group"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out"></span>
            </a>

            <Link href="/members" className="text-gray-700 relative group">
              Members
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out"></span>
            </Link>
          </div>

          <>
            <DialogBar className="sm:hidden" />
            <a
            // link for del apps 2025 - https://forms.gle/utvTMSG6oKGPpzYX8
              href=" "
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="rounded-full bg-blue-600" variant="default">
                Register Now
              </Button>
            </a>
          </>
        </div>
      </div>
    </div>
  );
}

export function DialogBar({ className }: { className?: string }) {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: BLOG_URL, external: true }, // Updated to external link
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
              {item.external ? (
                <a
                  href={item.href}
                  className="text-lg font-medium text-primary hover:text-primary-focus transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : item.href ? (
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
