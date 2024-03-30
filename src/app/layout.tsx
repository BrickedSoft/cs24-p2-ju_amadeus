import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";

import "./globals.css";
import ProgressBar from "@/components/ProgressBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "EcoSync",
  description:
    "Revolutionizing Waste Management in Dhaka North City Corporation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${workSans.variable}`}>
        <div className="flex flex-col justify-between min-h-screen overflow-hidden">
          <Suspense>
            <ProgressBar />
          </Suspense>
          {children}
        </div>
      </body>
    </html>
  );
}
