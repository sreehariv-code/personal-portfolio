import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sreehari P V — Software Engineer",
  description:
    "Software Engineer with 2+ years of experience building scalable web and mobile applications across the React.js, Next.js, and React Native ecosystem.",
  keywords: [
    "React",
    "React Native",
    "Next.js",
    "TypeScript",
    "Software Engineer",
    "Frontend Developer",
  ],
  authors: [{ name: "Sreehari P V" }],
  openGraph: {
    title: "Sreehari P V — Software Engineer",
    description:
      "Building scalable web and mobile applications with React, Next.js, and React Native.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} font-display`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
