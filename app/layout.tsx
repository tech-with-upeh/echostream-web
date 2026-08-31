import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import "./marketing.css";
import SiteChrome from "@/components/SiteChrome";

const dmSans = DM_Sans({ variable: "--font-poppins", subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "EchoStream — Let your community be heard",
  description: "EchoStream turns community messages into expressive speech for more interactive live experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
