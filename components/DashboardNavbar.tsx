"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { chevronDownOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export default function DashboardNavbar() {
  const [plansOpen, setPlansOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const plansRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!plansRef.current?.contains(target)) setPlansOpen(false);
      if (!profileRef.current?.contains(target)) setProfileOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="dashboard-header">
      <nav className="dashboard-navbar" aria-label="Dashboard navigation">
        <Link href="/dashboard" className="dashboard-brand" aria-label="EchoStream dashboard">
          <img src="/logo.svg" alt="" aria-hidden="true" />
          <span>EchoStream</span>
        </Link>

        <div className="dashboard-nav-actions">
          <div className="dashboard-dropdown" ref={plansRef}>
            <button
              type="button"
              className="dashboard-nav-link dashboard-dropdown-trigger"
              aria-expanded={plansOpen}
              onClick={() => {
                setPlansOpen(!plansOpen);
                setProfileOpen(false);
              }}
            >
              Premium Plans
              <IonIcon icon={chevronDownOutline} aria-hidden="true" />
            </button>
            {plansOpen && (
              <div className="dashboard-menu dashboard-plans-menu">
                <Link href="/plans/essential" onClick={() => setPlansOpen(false)}>
                  <strong>Essential</strong>
                  <span>More power for your streams</span>
                </Link>
                <Link href="/plans/pro" onClick={() => setPlansOpen(false)}>
                  <strong>Pro</strong>
                  <span>Advanced voices and features</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="dashboard-nav-link">Support</Link>
          <Link href="/getmobile" className="dashboard-nav-link">Download</Link>

          <div className="dashboard-profile" ref={profileRef}>
            <button
              type="button"
              className="dashboard-profile-trigger"
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              onClick={() => {
                setProfileOpen(!profileOpen);
                setPlansOpen(false);
              }}
            >
              <span className="dashboard-avatar">
                <img
                  src="/avatar.jpg"
                  alt=""
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <span aria-hidden="true">WU</span>
              </span>
              <span className="dashboard-profile-label">Profile</span>
              <IonIcon icon={chevronDownOutline} aria-hidden="true" />
            </button>

            {profileOpen && (
              <div className="dashboard-menu dashboard-profile-menu">
                <Link href="/account" onClick={() => setProfileOpen(false)}>Account</Link>
                <button type="button" onClick={() => setProfileOpen(false)}>Log out</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
