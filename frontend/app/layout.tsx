import type { Metadata } from "next";
import {Oxanium } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Kanvix",
  description: "Collaborative Project Management, Multi-Tenant and Live sync",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", oxanium.variable)}
    >
      <body className="relative h-screen">
        {children}
         <Toaster richColors/>
      </body>
    </html>
  );
}
