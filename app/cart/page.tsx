"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "../pricing/pricing.css";

const PLANS = {
  essential: { name: "Essential", monthly: 1600, yearly: 16000 },
  pro: { name: "Pro", monthly: 3200, yearly: 32000 },
};

export default function CartPage() {
  const [planKey, setPlanKey] = useState<keyof typeof PLANS>("essential");
  const [duration, setDuration] = useState<"1" | "12">("1");
  const plan = PLANS[planKey];
  const price = duration === "1" ? plan.monthly : plan.yearly;
  const monthlyEquivalent = Math.round(plan.yearly / 12);
  const savings = duration === "12" ? plan.monthly * 12 - plan.yearly : 0;

  return (
    <main className="cart-page">
      <div className="cart-shell">
        <Link href="/" className="cart-brand">
          <Image src="/logo.svg" alt="EchoStream" width={38} height={38} priority />
          <span>EchoStream</span>
        </Link>

        <header className="cart-header">
          <p>CHECKOUT</p>
          <h1>Your cart</h1>
          <span>Review your plan and choose your billing duration.</span>
        </header>

        <div className="cart-grid">
          <section className="cart-card">
            <div className="cart-card-heading">
              <div>
                <span className="eyebrow">PLAN NAME</span>
                <h2>{plan.name}</h2>
                <p className="cart-plan-label">EchoStream Plan</p>
              </div>
              <Image src="/logo.svg" alt="EchoStream" width={48} height={48} />
            </div>

            <div className="duration-section">
              <div className="duration-title">
                <span>Duration / Period</span>
                <small>{duration === "12" ? `Save ₦${savings.toLocaleString()}` : ""}</small>
              </div>
              <div className="duration-options">
                <button className={duration === "1" ? "selected" : ""} onClick={() => setDuration("1")}>
                  <span>1 Month</span>
                  <strong>₦{plan.monthly.toLocaleString()}</strong>
                </button>
                <button className={duration === "12" ? "selected" : ""} onClick={() => setDuration("12")}>
                  <span>12 Months</span>
                  <strong>₦{plan.yearly.toLocaleString()}</strong>
                  <em>Best value</em>
                </button>
              </div>
            </div>

            <p className="billing-copy">
              {duration === "12"
                ? `Billed every 12 months at ₦${price.toLocaleString()}. Equivalent to ₦${monthlyEquivalent.toLocaleString()} per month.`
                : `Billed every month at ₦${price.toLocaleString()}.`}
            </p>
          </section>

          <aside className="summary-card">
            <span className="eyebrow">ORDER SUMMARY</span>
            <h2>Order summary</h2>

            <div className="summary-row"><span>{plan.name} Plan</span><strong>₦{price.toLocaleString()}</strong></div>
            <div className="summary-row"><span>{duration === "1" ? "1 month" : "12 months"}</span><span>{duration === "12" ? "Annual" : "Monthly"}</span></div>

            <div className="summary-divider" />
            {savings > 0 && <div className="summary-row savings"><span>Annual savings</span><strong>−₦{savings.toLocaleString()}</strong></div>}
            <div className="summary-total"><span>Total</span><strong>₦{price.toLocaleString()}</strong></div>

            <Link href="/login" className="checkout-button">Continue to checkout <span>→</span></Link>
            <p className="secure-note">Secure payment · Cancel anytime</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
