"use client";

import Link from "next/link";
import Image from "next/image";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, arrowForward, checkmark } from "ionicons/icons";
import "../pricing.css";

const FEATURES = [
  "Unlimited basic generations",
  "High-fidelity 4K exports",
  "Priority render queue",
  "Custom style training (up to 5)",
];

export default function EssentialPlanPage() {
  return (
    <main className="pricing-page plan-details-page">
      <section className="pricing-hero">
        <Link href="/pricing" className="plan-back"><IonIcon icon={arrowBackOutline} /> Back to plans</Link>
        <div className="pricing-brand">
          <Image src="/logo.svg" alt="EchoStream" width={32} height={32} priority />
          <span>EchoStream AI</span>
        </div>

        <div className="plan-details-card pricing-card">
          <span className="pricing-badge plan-details-badge">BEST VALUE</span>
          <p className="plan-details-label">ECHOSTREAM PREMIUM</p>
          <h1>Essential</h1>
          <div className="pricing-price"><strong>$9.99</strong><span>/mo</span></div>
          <p className="pricing-description">The definitive toolkit for professional creators and daily users.</p>
          <div className="pricing-divider" />
          <h2>Everything you need to stream better</h2>
          <ul>
            {FEATURES.map((feature) => <li key={feature}><span className="pricing-check"><IonIcon icon={checkmark} /></span><span>{feature}</span></li>)}
          </ul>
          <Link href="/cart?plan=essential" className="pricing-button pricing-button-primary plan-details-button"><span>Choose Essential</span><IonIcon icon={arrowForward} /></Link>
        </div>
      </section>
    </main>
  );
}
