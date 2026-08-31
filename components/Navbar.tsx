"use client";

import { useState } from "react";
import { menuOutline, closeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMenu = () => setMobileNavOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar">
        <a className="logo" href="/" onClick={closeMenu}>
          <img src="/logo.svg" alt="" aria-hidden="true" />
          <span>EchoStream</span>
        </a>
        <div className={`nav-right ${mobileNavOpen ? " is-open" : ""}`}>
          <div className="nav-links">
            <a href="/about" onClick={closeMenu}>About</a>
            <a href="/features" onClick={closeMenu}>Features</a>
            <a href="/#how-it-works" onClick={closeMenu}>How It Works</a>
            <a href="/contact" onClick={closeMenu}>Contact</a>
          </div>
        </div>
        <button
          className="mobile-menu"
          type="button"
          aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <IonIcon icon={mobileNavOpen ? closeOutline : menuOutline} aria-hidden="true" />
        </button>
      </nav>
    </header>
  );
}
