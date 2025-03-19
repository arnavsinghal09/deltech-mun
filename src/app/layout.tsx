import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./providers";
import Header2 from "../components/custom/Header2";
import Footer from "../components/custom/Footer";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DelTech MUN & DebSoc",
  description: "Official website of the DelTech MUN",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`inter.className bg-gradient-to-r from-blue-100 via-white  to-blue-100`}
      >
        <Provider>
          <div className="flex flex-col min-h-screen">
            <Header2 />
            <div className="min-h-screen pt-[headerHeight]">{children}</div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
