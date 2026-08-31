'use client'
import { logoFacebook, logoInstagram, logoTiktok, logoTwitter, sendOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-waves" aria-hidden="true">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none"><path d="M0 120 C180 30 330 155 520 95 S850 25 1030 100 S1270 165 1440 65"/><path d="M0 145 C180 55 340 180 530 120 S860 50 1040 125 S1275 185 1440 90"/><path d="M0 170 C190 80 350 205 540 145 S870 75 1050 150 S1280 205 1440 115"/></svg>
      </div>
      <div className="footer-inner">
        <div className="footer-logo"><img src="/logo.svg" alt="EchoStream" /></div>
        <div className="footer-main">
          <div className="footer-contact"><span className="footer-label">Contact</span><a href="mailto:hello@echostream.app">hello@echostream.app</a><a href="tel:+2340000000000">+234 000 000 0000</a></div>
          <div className="footer-social"><span className="footer-label">Follow</span><div className="footer-social-links"><a href="#" aria-label="TikTok"><IonIcon icon={logoTiktok} /></a><a href="#" aria-label="Instagram"><IonIcon icon={logoInstagram} /></a><a href="#" aria-label="Twitter"><IonIcon icon={logoTwitter} /></a><a href="#" aria-label="Telegram"><IonIcon icon={sendOutline} /></a></div></div>
        </div>
        <div className="footer-bottom"><span>© 2026 EchoStream. All rights reserved.</span></div>
      </div>
    </footer>
  );
}
