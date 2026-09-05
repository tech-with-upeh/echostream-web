"use client";

import { IonIcon } from "@ionic/react";
import { arrowBackOutline, cardOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavbar";
import { cacheSubscriptionManagement, getSessionSubscription, getSubscriptionManagement, SubscriptionManagement } from "@/lib/api";
import "../dashboard-ui.css";
import "../dashboard.css";
import "./subs-manage.css";

function formatDate(value: string | null) { if (!value) return "—"; const date = new Date(value); if (Number.isNaN(date.getTime())) return "—"; return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date); }
function formatPlan(value: string) { if (!value) return "—"; return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); }
function formatInterval(value: string) { const normalized = value.toLowerCase(); if (normalized === "month" || normalized === "monthly") return "monthly"; if (normalized === "year" || normalized === "yearly" || normalized === "annual") return "yearly"; return value; }
function humanize(value: string | null | undefined) { return value ? value.replace(/[_-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "—"; }
function isCancelledPaymentMethod(value: string | null | undefined) { return ["cancel", "canceled", "cancelled", "non_renewing", "non-renewing"].includes((value || "").toLowerCase()); }

function ExpiringSubscriptionNotice({ oneTime }: { oneTime: boolean }) {
  return <div className="subs-expiring-notice">
    <svg className="subs-expiring-illustration" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="38" y="27" width="144" height="96" rx="14" stroke="currentColor" strokeWidth="3" />
      <path d="M38 54H182" stroke="currentColor" strokeWidth="3" />
      <path d="M60 77H108" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 96H91" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="155" cy="99" r="25" fill="var(--background)" stroke="currentColor" strokeWidth="3" />
      <path d="M155 85V100L165 106" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <p>{oneTime ? "Your current subscription will expire after the billing period. Please add a payment method." : "Your current subscription is cancelled and will expire after the billing period. Please add a payment method."}</p>
  </div>;
}

export default function SubscriptionManagePage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionManagement | null>(() => getSessionSubscription());
  const [loading, setLoading] = useState(() => !getSessionSubscription());
  useEffect(() => { let mounted = true; getSubscriptionManagement().then((data) => { cacheSubscriptionManagement(data); if (mounted) setSubscription(data); }).catch(() => { if (mounted && !getSessionSubscription()) setSubscription(null); }).finally(() => { if (mounted) setLoading(false); }); return () => { mounted = false; }; }, []);

  const plan = subscription ? formatPlan(subscription.plan) : "—";
  const isOneTime = subscription?.type === "one_time";
  const paymentMethodCancelled = isCancelledPaymentMethod(subscription?.payment_method);
  const needsPaymentMethod = isOneTime || paymentMethodCancelled;
  const canCancel = subscription?.can_cancel ?? false;
  const endDate = formatDate(subscription?.subscription_ends_at ?? null);
  const interval = subscription ? formatInterval(subscription.interval) : "—";
  const details = subscription?.payment_method_details;
  const managementLink = subscription?.management_link || subscription?.link || null;
  const paymentName = details?.brand || details?.card_type || details?.method || subscription?.payment_channel;
  const hasLast4 = Boolean(details?.last4);
  const openManagementLink = () => { if (managementLink) window.open(managementLink, "_blank", "noopener,noreferrer"); };

  return <main className="subs-manage-page"><DashboardNavbar /><section className="subs-manage-content"><button type="button" className="subs-back-button" onClick={() => router.push("/dashboard")}><IonIcon icon={arrowBackOutline} aria-hidden="true" /><span>Back</span></button><section className="subs-plan-card"><div className="subs-plan-top"><span className="subs-eyebrow">CURRENT PLAN</span><div className="subs-plan-brand"><img src="/logo.svg" alt="" aria-hidden="true" /><div><h1>{loading ? <span className="subs-spinner" role="status" aria-label="Loading subscription" /> : plan}</h1><p>EchoStream Plan</p></div></div><p className="subs-plan-description">Your current plan gives you everything you need for your streams, including premium voices and enhanced features.</p></div><div className="subs-plan-bottom"><div><span>{isOneTime ? "Access until" : "Next bill"}</span><strong>{loading ? "" : isOneTime ? "One time" : interval}</strong><small>{loading ? "" : endDate}</small></div><button type="button" className="subs-change-plan" onClick={() => router.push("/pricing")}>Change plan</button></div></section>

  {needsPaymentMethod && !loading ? <><ExpiringSubscriptionNotice oneTime={isOneTime} /></> : <>
    <section className="subs-cancel-section"><div><h2>Cancel subscription</h2><p>Cancel your {plan} plan. You’ll continue to have access until the end of your current billing period.</p></div><button type="button" className={`subs-cancel-button${!canCancel || !managementLink ? " subs-cancel-disabled" : ""}`} disabled={!canCancel || !managementLink} onClick={openManagementLink}>Cancel subscription</button></section>
    <section className="subs-payment-card"><div className="subs-payment-heading"><span className="subs-eyebrow">PAYMENTS</span><h2>Payment</h2><p>{loading ? "" : `Your next bill is due ${endDate}. Billed ${interval}.`}</p></div><hr /><div className="subs-payment-method"><div className="subs-card-icon" aria-hidden="true"><IonIcon icon={cardOutline} /></div><div className="subs-card-info"><span>{loading ? "Loading payment details" : humanize(paymentName)}</span><strong>{loading ? "" : hasLast4 ? `•••• ${details?.last4}` : details?.bank ? humanize(details.bank) : `${interval} billing`}</strong>{!loading && details?.bank && hasLast4 && <small>{humanize(details.bank)}</small>}{!loading && details?.card_type && !details?.brand && <small>{humanize(details.card_type)}</small>}</div><button type="button" className="subs-update-card" disabled={loading || !managementLink} aria-disabled={loading || !managementLink} onClick={openManagementLink}>Update</button></div></section>
  </>}</section></main>;
}
