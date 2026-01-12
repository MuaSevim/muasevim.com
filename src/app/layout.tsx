import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammed Sevim | Full Stack Engineer",
  description:
    "Building scalable, high-performance web applications. Specializing in React, Next.js, and Cloud Architecture.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Cloud Architecture",
    "Software Engineer",
  ],
  authors: [{ name: "Muhammed Sevim" }],
  openGraph: {
    title: "Muhammed Sevim | Full Stack Engineer",
    description:
      "Building scalable, high-performance web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >

        {children}
      </body>
    </html>
  );
}
