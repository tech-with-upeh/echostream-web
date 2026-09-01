"use client";

import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { checkmark, arrowForward, waveform } from "ionicons/icons";
import "./pricing.css";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  button: string;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    description: "Essential tools for individual creators to begin their journey.",
    features: ["Basic AI generation (100 credits/mo)", "Standard export resolution", "Community support access"],
    button: "Get Started",
  },
  {
    name: "Essential",
    price: "$9.99",
    description: "The definitive toolkit for professional creators and daily users.",
    features: ["Unlimited basic generations", "High-fidelity 4K exports", "Priority render queue", "Custom style training (up to 5)"],
    button: "Upgrade Now",
    popular: true,
  },
  {
    name: "Pro",
    price: "$19.99",
    description: "Uncompromised power for studios and enterprise-scale workflows.",
    features: ["Everything in Essential", "API access & documentation", "Unlimited custom style training", "Dedicated account manager"],
    button: "Upgrade Now",
  },
];

export default function PricingPage() {
  return (
    <main className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-brand">
          <IonIcon icon={waveform} aria-hidden="true" />
          <span>EchoStream AI</span>
        </div>

        <div className="pricing-heading">
          <h1>Atmospheric Precision.</h1>
          <h2>Choose your tier.</h2>
          <p>Unlock the full potential of your AI workflow with tools designed for cinematic fidelity.</p>
        </div>

        <div className="pricing-plans">
          {PLANS.map((plan) => (
            <article className={`pricing-card-wrap${plan.popular ? " pricing-card-popular" : ""}`} key={plan.name}>
              {plan.popular && <span className="pricing-badge">BEST VALUE</span>}
              <div className="pricing-card">
                <h3>{plan.name}</h3>
                <div className="pricing-price"><strong>{plan.price}</strong><span>/mo</span></div>
                <p className="pricing-description">{plan.description}</p>
                <div className="pricing-divider" />
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className="pricing-check"><IonIcon icon={checkmark} aria-hidden="true" /></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pricing-button-wrap">
                  <Link href="/login" className={`pricing-button${plan.popular ? " pricing-button-primary" : ""}`}>
                    <span>{plan.button}</span>
                    <IonIcon icon={arrowForward} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="pricing-legal">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
      </section>
    </main>
  );
}
