import DashboardNavbar from "@/components/DashboardNavbar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard — Moonboy",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink md:flex-row">
       
      <main className="min-w-0 flex-1"><DashboardNavbar /> {children}</main>
    </div>
  );
}
