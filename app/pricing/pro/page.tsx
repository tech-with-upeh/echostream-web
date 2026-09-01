"use client";

import Link from "next/link";
import Image from "next/image";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, arrowForward, checkmark } from "ionicons/icons";
import "../pricing.css";

const FEATURES = [
  "Everything in Essential",
  "API access & documentation",
  "Unlimited custom style training",
  "Dedicated account manager",
];

export default function ProPlanPage() {
  return (
    <main className="pricing-page plan-details-page">
      <section className="pricing-hero">
        <Link href="/pricing" className="plan-back"><IonIcon icon={arrowBackOutline} /> Back to plans</Link>
        <div className="pricing-brand">
          <Image src="/logo.svg" alt="EchoStream" width={32} height={32} priority />
          <span>EchoStream AI</span>
        </div>

        <div className="plan-details-card pricing-card">
          <p className="plan-details-label">ECHOSTREAM PREMIUM</p>
          <h1>Pro</h1>
          <div className="pricing-price"><strong>$19.99</strong><span>/mo</span></div>
          <p className="pricing-description">Uncompromised power for studios and enterprise-scale workflows.</p>
          <div className="pricing-divider" />
          <h2>Everything in Essential, and more</h2>
          <ul>
            {FEATURES.map((feature) => <li key={feature}><span className="pricing-check"><IonIcon icon={checkmark} /></span><span>{feature}</span></li>)}
          </ul>
          <Link href="/cart?plan=pro" className="pricing-button pricing-button-primary plan-details-button"><span>Choose Pro</span><IonIcon icon={arrowForward} /></Link>
        </div>
      </section>
    </main>
  );
}
