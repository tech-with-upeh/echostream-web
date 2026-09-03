import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardAuthGuard from "@/components/DashboardAuthGuard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — EchoStream",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardAuthGuard>
      <div className="flex min-h-screen flex-col bg-surface text-ink md:flex-row">
        <main className="min-w-0 flex-1">
          <DashboardNavbar />
          {children}
        </main>
      </div>
    </DashboardAuthGuard>
  );
}
