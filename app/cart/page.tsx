"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import "../pricing/pricing.css";

const PLANS = {
  essential: { name: "Essential", monthly: 1600, yearly: 16000 },
  pro: { name: "Pro", monthly: 3200, yearly: 32000 },
};

export default function CartPage() {
  const [planKey] = useState<keyof typeof PLANS>("essential");
  const [duration, setDuration] = useState<"1" | "12">("1");
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");

  const plan = PLANS[planKey];
  const price = duration === "1" ? plan.monthly : plan.yearly;
  const monthlyEquivalent = Math.round(plan.yearly / 12);
  const savings = duration === "12" ? plan.monthly * 12 - plan.yearly : 0;

  return (
    <main className="cart-page">
      <div className="cart-shell">
        

        <header className="cart-header">
         
          <h1>Your cart</h1>
          <span>Review your plan and choose your billing duration.</span>
        </header>

        <div className="cart-grid">
          <section className="cart-card">
            <div className="cart-card-heading">
              <div>
                <h2>{plan.name}</h2>
                <p className="cart-plan-label">EchoStream Plan</p>
              </div>
              <Image src="/logo.svg" alt="EchoStream" width={48} height={48} />
            </div>

            <div className="duration-section">
              <div className="duration-title">
                <span>Duration / Period</span>
                <div className="duration-price-info">
                  {savings > 0 && <small>Save ₦{savings.toLocaleString()}</small>}
                  <strong>₦{price.toLocaleString()}</strong>
                </div>
              </div>

              <div className="duration-select-wrap">
                <IonIcon className="duration-select-check" icon={checkmark} aria-hidden="true" />
                <select
                  className="duration-select"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value as "1" | "12")}
                  aria-label="Choose subscription duration"
                >
                  <option value="1">1 Month — ₦{plan.monthly.toLocaleString()}</option>
                  <option value="12">12 Months — ₦{plan.yearly.toLocaleString()}</option>
                </select>
              </div>
            </div>

            <div className="duration-deal-divider" />

            {duration === "1" && (
              <div className="duration-deal">
                <p>
                  Switch to a 24-month subscription for the <strong>biggest savings</strong>.
                </p>
                <button
                  type="button"
                  className="duration-deal-button"
                  onClick={() => setDuration("12")}
                >
                  Get deal
                </button>
              </div>
            )}

            <p className="billing-copy">
              {duration === "12"
                ? `Billed every 12 months at ₦${price.toLocaleString()}. Equivalent to ₦${monthlyEquivalent.toLocaleString()} per month.`
                : `Billed every month at ₦${price.toLocaleString()}.`}
            </p>
          </section>

          <aside className="summary-card">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>{plan.name} Plan</span>
              <strong>₦{price.toLocaleString()}</strong>
            </div>
            <div className="summary-row">
              <span>{duration === "1" ? "1 month" : "12 months"}</span>
              <span>{duration === "12" ? "Annual" : "Monthly"}</span>
            </div>
            <div className="summary-divider" />
            {savings > 0 && (
              <div className="summary-row savings">
                <span>Annual savings</span>
                <strong>−₦{savings.toLocaleString()}</strong>
              </div>
            )}
            <div className="summary-total">
              <span>Total</span>
              <strong>₦{price.toLocaleString()}</strong>
            </div>

            <button
              type="button"
              className="coupon-link"
              onClick={() => setCouponOpen((open) => !open)}
              aria-expanded={couponOpen}
            >
              Use coupon code
            </button>

            {couponOpen && (
              <div className="coupon-input-wrap">
                <input
                  type="text"
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                  placeholder="Enter coupon code"
                  aria-label="Coupon code"
                  autoFocus
                />
                <button type="button">Apply</button>
              </div>
            )}

            <Link href="/login" className="checkout-button">
              Continue to checkout <span>→</span>
            </Link>
            <p className="secure-note">Secure payment · Cancel anytime</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
