import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({ variable: "--font-poppins", subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "EchoStream — Let your community be heard",
  description: "EchoStream turns community messages into expressive speech for more interactive live experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
