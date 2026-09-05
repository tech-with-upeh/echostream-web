'use client'

import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { cacheCurrentUser, cacheSubscriptionManagement, getCurrentUser, getSessionSubscription, getSessionUser, getSubscriptionManagement, CurrentUser, SubscriptionManagement } from "@/lib/api";
import { cardOutline, createOutline, diamondOutline, chevronForwardOutline, closeOutline, helpCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useRouter } from "next/navigation";
import "./dashboard.css";
import "./dashboard-ui.css";

const settingGroups = [
  { title: "Subscription", items: [
    { label: "Available subscription", icon: diamondOutline, href: "/pricing", paymentRelated: false },
    { label: "Manage Subscription", icon: "/logo.svg", href: "/dashboard/subs-manage", paymentRelated: true },
    { label: "Cancel Subscription", icon: closeOutline, href: "/dashboard/cancel-sub", paymentRelated: true },
  ]},
  { title: "Payment", items: [
    { label: "Payment history", icon: cardOutline, href: "/dashboard/payment-history", paymentRelated: true },
    { label: "Redeem", icon: diamondOutline, href: "/dashboard/redeem", paymentRelated: false },
  ]},
];

function SettingIcon({ icon }: { icon: string }) { if (icon === "/logo.svg") return <img className="dashboard-setting-logo" src={icon} alt="" aria-hidden="true" />; return <IonIcon icon={icon} aria-hidden="true" />; }
function formatPlan(plan: string) { return !plan ? "Starter" : plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase(); }
function formatDate(date: string | null) { if (!date) return null; const parsed = new Date(date); if (Number.isNaN(parsed.getTime())) return null; return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(parsed); }
function humanize(value: string | null | undefined) { return value ? value.replace(/[_-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : ""; }
function formatSubscriptionStatus(status: string | null | undefined) { return humanize(status) || "Unknown"; }
function normalizedSubscriptionStatus(status: string | null | undefined) { return (status || "").toLowerCase().replace(/[_\s]+/g, "-"); }
function statusClass(status: string | null | undefined) { return `dashboard-subscription-status-${normalizedSubscriptionStatus(status) || "unknown"}`; }
function paymentCardType(subscription: SubscriptionManagement) {
  const details = subscription.payment_method_details;
  return humanize(details?.brand || details?.card_type || details?.method || subscription.payment_channel) || "Payment";
}
function paymentDetail(subscription: SubscriptionManagement) {
  const details = subscription.payment_method_details;
  if (!details) return "";
  if (details.last4) return `•••• ${details.last4}`;
  return "";
}

export default function DashboardPage() {
  const router = useRouter(); const cachedUser = getSessionUser(); const cachedSubscription = getSessionSubscription();
  const [user, setUser] = useState<CurrentUser | null>(() => cachedUser); const [subscription, setSubscription] = useState<SubscriptionManagement | null>(() => cachedSubscription); const [subscriptionLoading, setSubscriptionLoading] = useState(() => !cachedSubscription && cachedUser?.plan?.toLowerCase() !== "starter");
  useEffect(() => { let mounted = true; const accessToken = localStorage.getItem("echostream_access_token"); if (!accessToken) { if (mounted) setSubscriptionLoading(false); return () => { mounted = false; }; }
    async function loadDashboard() { try { const freshUser = await getCurrentUser(); if (!mounted) return; cacheCurrentUser(freshUser); setUser(freshUser); if (freshUser.plan?.toLowerCase() === "starter") { setSubscription(null); setSubscriptionLoading(false); return; }
      try { const freshSubscription = await Promise.race([getSubscriptionManagement(), new Promise<SubscriptionManagement>((_, reject) => setTimeout(() => reject(new Error("Subscription request timed out")), 10000))]); if (!mounted) return; cacheSubscriptionManagement(freshSubscription); setSubscription(freshSubscription); } catch (error) { console.error("Failed to load subscription management:", error); } finally { if (mounted) setSubscriptionLoading(false); }
    } catch (error) { console.error("Failed to load current user:", error); if (mounted) setSubscriptionLoading(false); } }
    loadDashboard(); return () => { mounted = false; };
  }, []);

  const plan = formatPlan(subscription?.plan || user?.plan || "Starter"); const endDate = subscription ? formatDate(subscription.subscription_ends_at) : formatDate(user?.subscription_ends_at ?? null); const isOneTime = subscription?.type === "one_time"; const isStarter = plan.toLowerCase() === "starter"; const disablePaymentActions = subscriptionLoading || isOneTime || isStarter; const subscriptionStatus = subscription?.subscription_status; const normalizedStatus = normalizedSubscriptionStatus(subscriptionStatus); const isNonRenewing = ["non-renewing", "canceled", "cancelled"].includes(normalizedStatus);
  return <main className="dashboard-page"><DashboardNavbar /><section className="dashboard-content" aria-label="Dashboard"><div className="dashboard-overview"><div className="dashboard-plan-card"><span className="dashboard-plan-badge">Your plan</span>{subscription && <span className={`dashboard-subscription-status ${statusClass(subscriptionStatus)}`}>{formatSubscriptionStatus(subscriptionStatus)}</span>}<div className="dashboard-plan-heading"><img src="/logo.svg" alt="" aria-hidden="true" />{user || subscription ? <h1>{plan}</h1> : <span className="dashboard-plan-spinner" role="status" aria-label="Loading subscription" />}</div>{subscription?.type === "one_time" ? <p className="dashboard-billing-copy">Your plan is active until <strong>{endDate ?? "—"}</strong>.</p> : <p className="dashboard-billing-copy">Your next bill is due <strong>{endDate ?? "—"}</strong>.{subscription?.interval ? ` Billed ${subscription.interval}.` : ""}</p>}{subscription && <div className="dashboard-card-details"><strong>{paymentCardType(subscription)}</strong>{paymentDetail(subscription) && <span>{paymentDetail(subscription)}</span>}{subscription.payment_method_details?.bank && <small>{humanize(subscription.payment_method_details.bank)}</small>}{subscriptionStatus && <em className="dashboard-renewal-status">{formatSubscriptionStatus(subscriptionStatus)}</em>}</div>}{isNonRenewing && <div className="dashboard-subscription-alert"><IonIcon icon={closeOutline} aria-hidden="true" /><span>Cancelled — your access remains available until {endDate ?? "the end of your current period"}.</span></div>}</div><div className="dashboard-actions"><button type="button" className="dashboard-action-card"><IonIcon icon={createOutline} aria-hidden="true" /><span>Edit Personal Info</span></button><button type="button" className="dashboard-action-card" disabled={disablePaymentActions} aria-disabled={disablePaymentActions}><IonIcon icon={cardOutline} aria-hidden="true" /><span>Update card</span></button></div></div>{settingGroups.map((group) => <section className="dashboard-section-card" key={group.title}><h2 className="dashboard-section-title">{group.title}</h2><div className="dashboard-setting-list">{group.items.map((item) => { const disabled = item.paymentRelated && (subscriptionLoading || isStarter); return <button type="button" className={`dashboard-setting-row${disabled ? " dashboard-setting-row-disabled" : ""}`} key={item.label} disabled={disabled} aria-disabled={disabled} onClick={() => !disabled && item.href && router.push(item.href)}><span className="dashboard-setting-label"><SettingIcon icon={item.icon} /><span>{item.label}</span></span><IonIcon className="dashboard-setting-caret" icon={chevronForwardOutline} aria-hidden="true" /></button>; })}</div></section>)}<section className="dashboard-section-card dashboard-help-card"><h2 className="dashboard-section-title">Help</h2><button type="button" className="dashboard-setting-row dashboard-help-row"><span className="dashboard-setting-label"><IonIcon icon={helpCircleOutline} aria-hidden="true" /><span>Echostream Support</span></span><IonIcon className="dashboard-setting-caret" icon={chevronForwardOutline} aria-hidden="true" /></button></section></section></main>;
}
