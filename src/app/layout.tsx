import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./providers";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";

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
        className={`inter.className bg-gradient-to-r from-blue-200 via-blue-100 via-white via-blue-100 to-blue-200`}
      >
        <Provider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="min-h-screen pt-[headerHeight]">{children}</div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
