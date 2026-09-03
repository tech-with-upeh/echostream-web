"use client";

import Link from "next/link";
import Image from "next/image";
import { IonIcon } from "@ionic/react";
import { checkmark, arrowForward } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getCurrentUser, subscribeToPlan, CurrentUser } from "@/lib/api";
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

const PLAN_RANK: Record<string, number> = {
  starter: 0,
  essential: 1,
  pro: 2,
};

function getCta(planName: string, user: CurrentUser | null) {
  if (!user) return { label: "Get Started", href: "/login" };

  const currentPlan = user.plan.toLowerCase();
  const targetPlan = planName.toLowerCase();
  const currentRank = PLAN_RANK[currentPlan] ?? 0;
  const targetRank = PLAN_RANK[targetPlan] ?? 0;

  if (targetPlan === currentPlan) {
    if (targetPlan === "starter") return { label: "Current plan", href: "/dashboard" };
    return { label: "Cancel", href: "/dashboard/subs-manage" };
  }

  if (targetRank > currentRank) return { label: "Upgrade", href: null };
  return { label: "Downgrade", href: null };
}

export default function PricingPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [actionPlan, setActionPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("echostream_access_token");

    if (!accessToken) {
      setSessionChecked(true);
      return;
    }

    getCurrentUser()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("echostream_access_token");
        localStorage.removeItem("echostream_refresh_token");
        localStorage.removeItem("echostream_token_type");
      })
      .finally(() => setSessionChecked(true));
  }, []);

  async function handlePlanAction(planName: string) {
    const cta = getCta(planName, user);
    if (cta.href) return;

    setActionPlan(planName);
    setError(null);

    try {
      const result = await subscribeToPlan(planName.toLowerCase(), "month");
      if (!result.authorization_url) {
        throw new Error("Payment authorization URL was not returned.");
      }
      window.location.href = result.authorization_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start subscription.");
      setActionPlan(null);
    }
  }

  return (
    <main className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-brand">
          <Image src="/logo.svg" alt="EchoStream" width={32} height={32} priority />
          <span>EchoStream AI</span>
        </div>

        <div className="pricing-heading">
          <h1>Atmospheric Precision.</h1>
          <h2>Choose your tier.</h2>
          <p>Unlock the full potential of your AI workflow with tools designed for cinematic fidelity.</p>
        </div>

        {error && <p className="pricing-action-error" role="alert">{error}</p>}

        <div className="pricing-plans">
          {PLANS.map((plan) => {
            const cta = getCta(plan.name, user);
            const loading = actionPlan === plan.name;

            return (
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
                    {cta.href ? (
                      <Link href={cta.href} className={`pricing-button${plan.popular ? " pricing-button-primary" : ""}`}>
                        <span>{sessionChecked ? cta.label : "..."}</span>
                        <IonIcon icon={arrowForward} aria-hidden="true" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={`pricing-button${plan.popular ? " pricing-button-primary" : ""}`}
                        onClick={() => handlePlanAction(plan.name)}
                        disabled={!sessionChecked || loading}
                      >
                        <span>{loading ? "Redirecting..." : sessionChecked ? cta.label : "..."}</span>
                        <IonIcon icon={arrowForward} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="pricing-legal">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
      </section>
    </main>
  );
}
