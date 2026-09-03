"use client";

import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, cardOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { cacheSubscriptionManagement, getSessionSubscription, getSubscriptionManagement, SubscriptionManagement } from "@/lib/api";
import "../dashboard-ui.css";
import "../dashboard.css";
import "./subs-manage.css";

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function formatPlan(value: string) {
  if (!value) return "—";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function formatInterval(value: string) {
  const normalized = value.toLowerCase();
  if (normalized === "month" || normalized === "monthly") return "monthly";
  if (normalized === "year" || normalized === "yearly" || normalized === "annual") return "yearly";
  return value;
}

export default function SubscriptionManagePage() {
  const [subscription, setSubscription] = useState<SubscriptionManagement | null>(() => getSessionSubscription());
  const [loading, setLoading] = useState(() => !getSessionSubscription());

  useEffect(() => {
    let mounted = true;
    getSubscriptionManagement()
      .then((data) => {
        cacheSubscriptionManagement(data);
        if (mounted) setSubscription(data);
      })
      .catch(() => {
        if (mounted && !getSessionSubscription()) setSubscription(null);
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const plan = subscription ? formatPlan(subscription.plan) : "—";
  const isOneTime = subscription?.type === "one_time";
  const canCancel = subscription?.can_cancel ?? false;
  const endDate = formatDate(subscription?.subscription_ends_at ?? null);
  const interval = subscription ? formatInterval(subscription.interval) : "—";

  return (
    <main className="subs-manage-page">
      <section className="subs-manage-content">
        <Link href="/dashboard" className="subs-back-button"><IonIcon icon={arrowBackOutline} aria-hidden="true" /><span>Back</span></Link>

        <section className="subs-plan-card">
          <div className="subs-plan-top">
            <span className="subs-eyebrow">CURRENT PLAN</span>
            <div className="subs-plan-brand">
              <img src="/logo.svg" alt="" aria-hidden="true" />
              <div><h1>{loading ? <span className="subs-spinner" role="status" aria-label="Loading subscription" /> : plan}</h1><p>EchoStream Plan</p></div>
            </div>
            <p className="subs-plan-description">Your current plan gives you everything you need for your streams, including premium voices and enhanced features.</p>
          </div>
          <div className="subs-plan-bottom">
            <div><span>{isOneTime ? "Access until" : "Next bill"}</span><strong>{loading ? "" : isOneTime ? "One time" : interval}</strong><small>{loading ? "" : endDate}</small></div>
            <Link href="/pricing" className="subs-change-plan">Change plan</Link>
          </div>
        </section>

        <section className="subs-cancel-section">
          <div>
            <h2>{isOneTime ? "Subscription management" : "Cancel subscription"}</h2>
            <p>{isOneTime ? `Your ${plan} plan is a one-time payment and remains active until ${endDate}.` : `Cancel your ${plan} plan. You’ll continue to have access until the end of your current billing period.`}</p>
          </div>
          {!loading && !isOneTime && <Link href={canCancel ? "/cancel-sub" : "/dashboard/subs-manage"} className={`subs-cancel-button${!canCancel ? " subs-cancel-disabled" : ""}`} aria-disabled={!canCancel} onClick={(event) => { if (!canCancel) event.preventDefault(); }}>Cancel subscription</Link>}
        </section>

        <section className="subs-payment-card">
          <div className="subs-payment-heading">
            <span className="subs-eyebrow">PAYMENTS</span><h2>Payment</h2>
            <p>{loading ? "" : isOneTime ? `One-time payment. Your plan is active until ${endDate}.` : `Your next bill is due ${endDate}. Billed ${interval}.`}</p>
          </div>
          <hr />
          <div className="subs-payment-method">
            <div className="subs-card-icon" aria-hidden="true"><IonIcon icon={cardOutline} /></div>
            <div className="subs-card-info"><span>{loading ? "Loading payment details" : isOneTime ? "One time" : "Recurring payment"}</span><strong>{loading ? "" : isOneTime ? "No recurring payment method" : `${interval} billing`}</strong></div>
            <button type="button" className="subs-update-card" disabled={loading || isOneTime} aria-disabled={loading || isOneTime}>Update</button>
          </div>
        </section>
      </section>
    </main>
  );
}
