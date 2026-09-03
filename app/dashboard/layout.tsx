"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import type { Metadata } from "next";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard — EchoStream",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("echostream_access_token");

    if (!accessToken) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    setAuthorized(true);
  }, [pathname, router]);

  if (!authorized) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink md:flex-row">
      <main className="min-w-0 flex-1">
        <DashboardNavbar />
        {children}
      </main>
    </div>
  );
}
