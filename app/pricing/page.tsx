"use client";

import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { checkmark, arrowForward } from "ionicons/icons";
import { useEffect, useState } from "react";
import {
  cacheCurrentUser,
  getCurrentUser,
  getSessionUser,
  CurrentUser,
} from "@/lib/api";
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
    description: "Get your stream talking.",
    features: [
      "Text-to-speech for stream messages",
      "Basic voice selection",
      "Basic message filtering",
      "Basic audience controls",
      "Basic queue functionality",
      "Basic TTS settings",
      "Limited usage and features",
    ],
    button: "Get Started",
  },
  {
    name: "Essential",
    price: "$5",
    description: "More control. More interaction. More ways to engage your audience.",
    features: [
      "Everything in Starter",
      "Expanded voice selection",
      "More advanced message filtering",
      "Audience permissions",
      "Better queue controls",
      "Gift and message TTS",
      "More TTS customization",
      "Higher usage limits",
    ],
    button: "Upgrade Now",
    popular: true,
  },
  {
    name: "Pro",
    price: "$10",
    description: "Your stream. Your voice. Your rules.",
    features: [
      "Everything in Essential",
      "AI voice cloning",
      "Custom cloned voices",
      "Fish Audio and advanced voice options",
      "Advanced spam protection",
      "Advanced audience controls",
      "Advanced queue controls",
      "Queue sound alerts",
      "Custom audio alerts",
      "More powerful message filtering",
      "Advanced TTS preferences",
      "Higher usage limits",
      "Pro-only voice features",
    ],
    button: "Upgrade Now",
  },
];

const PLAN_RANK: Record<string, number> = { starter: 0, essential: 1, pro: 2 };

function getCta(planName: string, user: CurrentUser | null) {
  if (!user) {
    return {
      label: "Get Started",
      href: `/cart?plan=${planName.toLowerCase()}`,
    };
  }

  const currentPlan = user.plan.toLowerCase();
  const targetPlan = planName.toLowerCase();
  const currentRank = PLAN_RANK[currentPlan] ?? 0;
  const targetRank = PLAN_RANK[targetPlan] ?? 0;

  if (targetPlan === currentPlan) {
    return targetPlan === "starter"
      ? { label: "Current plan", href: "/dashboard" }
      : { label: "Cancel", href: "/cancel-sub" };
  }

  return targetRank > currentRank
    ? { label: "Upgrade", href: `/cart?plan=${targetPlan}` }
    : { label: "Downgrade", href: "/dashboard/subs-manage" };
}

export default function PricingPage() {
  const [user, setUser] = useState<CurrentUser | null>(() => getSessionUser());
  const [sessionChecked, setSessionChecked] = useState(
    () => getSessionUser() !== null,
  );

  useEffect(() => {
    let mounted = true;

    getCurrentUser()
      .then((data) => {
        cacheCurrentUser(data);
        if (mounted) setUser(data);
      })
      .catch(() => {
        if (mounted && !getSessionUser()) setUser(null);
      })
      .finally(() => {
        if (mounted) setSessionChecked(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-heading">
          <h1>Choose your tier.</h1>
          <p>
            Pick the EchoStream plan that gives your stream the voices,
            controls, and interaction you need.
          </p>
        </div>

        <div className="pricing-plans">
          {PLANS.map((plan) => {
            const cta = getCta(plan.name, user);

            return (
              <article
                className={`pricing-card-wrap${plan.popular ? " pricing-card-popular" : ""}`}
                key={plan.name}
              >
                {plan.popular && (
                  <span className="pricing-badge">BEST VALUE</span>
                )}

                <div className="pricing-card">
                  <h3>{plan.name}</h3>
                  <div className="pricing-price">
                    <strong>{plan.price}</strong>
                    <span>/mo</span>
                  </div>
                  <p className="pricing-description">{plan.description}</p>
                  <div className="pricing-divider" />

                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span className="pricing-check">
                          <IonIcon icon={checkmark} aria-hidden="true" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pricing-button-wrap">
                    <Link
                      href={cta.href}
                      className={`pricing-button${plan.popular ? " pricing-button-primary" : ""}`}
                      aria-disabled={!sessionChecked}
                      tabIndex={!sessionChecked ? -1 : undefined}
                    >
                      {!sessionChecked ? (
                        <span
                          className="pricing-spinner"
                          role="status"
                          aria-label="Loading session"
                        />
                      ) : (
                        <span>{cta.label}</span>
                      )}
                      <IonIcon icon={arrowForward} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="pricing-legal">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </section>
    </main>
  );
}
