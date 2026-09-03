'use client'
import DashboardNavbar from "@/components/DashboardNavbar";
import { getSubscriptionManagement, SubscriptionManagement } from "@/lib/api";
import { cardOutline, createOutline, diamondOutline, chevronForwardOutline, closeOutline, helpCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./dashboard.css";
import "./dashboard-ui.css";

const settingGroups = [
  {
    title: "Subscription",
    items: [
      { label: "Available subscription", icon: diamondOutline, href: "/pricing" },
      { label: "Manage Subscription", icon: "/logo.svg", href: "/dashboard/subs-manage" },
      { label: "Cancel Subscription", icon: closeOutline },
    ],
  },
  {
    title: "Payment",
    items: [
      { label: "Payment history", icon: cardOutline },
      { label: "Redeem", icon: diamondOutline },
    ],
  },
];

function SettingIcon({ icon }: { icon: string }) {
  if (icon === "/logo.svg") {
    return <img className="dashboard-setting-logo" src={icon} alt="" aria-hidden="true" />;
  }
  return <IonIcon icon={icon} aria-hidden="true" />;
}

function formatPlan(plan: string) {
  if (!plan) return "Starter";
  return plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase();
}

function formatDate(date: string | null) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsed);
}

function formatPaymentType(subscription: SubscriptionManagement) {
  if (subscription.type === "one_time") return "One time";
  if (subscription.payment_channel) {
    return subscription.payment_channel
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
  return "Recurring";
}

function SubscriptionCard() {
  const [subscription, setSubscription] = useState<SubscriptionManagement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getSubscriptionManagement()
      .then((data) => {
        if (mounted) setSubscription(data);
      })
      .catch((error) => {
        console.error("Failed to load subscription details:", error);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const plan = subscription ? formatPlan(subscription.plan) : "";
  const endDate = subscription ? formatDate(subscription.subscription_ends_at) : null;

  return (
    <div className="dashboard-plan-card">
      <span className="dashboard-plan-badge">Your plan</span>
      <div className="dashboard-plan-heading">
        <img src="/logo.svg" alt="" aria-hidden="true" />
        <h1>{loading ? "Loading..." : plan || "Starter"}</h1>
      </div>

      {subscription?.type === "one_time" ? (
        <p className="dashboard-billing-copy">
          Your plan is active until <strong>{endDate ?? "—"}</strong>.
        </p>
      ) : (
        <p className="dashboard-billing-copy">
          Your next bill is due <strong>{endDate ?? "—"}</strong>.
          {subscription?.interval ? ` Billed ${subscription.interval}.` : ""}
        </p>
      )}

      {subscription && (
        <p className="dashboard-card-details">
          {formatPaymentType(subscription)}
        </p>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionManagement | null>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getSubscriptionManagement()
      .then((data) => {
        if (mounted) setSubscription(data);
      })
      .catch((error) => {
        console.error("Failed to load subscription details:", error);
      })
      .finally(() => {
        if (mounted) setSubscriptionLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const isOneTime = subscription?.type === "one_time";

  return (
    <main className="dashboard-page">
      <section className="dashboard-content" aria-label="Dashboard">
        <div className="dashboard-overview">
          <SubscriptionCard />
          <div className="dashboard-actions">
            <button type="button" className="dashboard-action-card"><IonIcon icon={createOutline} aria-hidden="true" /><span>Edit Personal Info</span></button>
            <button
              type="button"
              className="dashboard-action-card"
              disabled={subscriptionLoading || isOneTime}
              aria-disabled={subscriptionLoading || isOneTime}
            >
              <IonIcon icon={cardOutline} aria-hidden="true" /><span>Update card</span>
            </button>
          </div>
        </div>

        {settingGroups.map((group) => (
          <section className="dashboard-section-card" key={group.title}>
            <h2 className="dashboard-section-title">{group.title}</h2>
            <div className="dashboard-setting-list">
              {group.items.map((item) => (
                <button
                  type="button"
                  className="dashboard-setting-row"
                  key={item.label}
                  onClick={() => item.href && router.push(item.href)}
                >
                  <span className="dashboard-setting-label"><SettingIcon icon={item.icon} /><span>{item.label}</span></span>
                  <IonIcon className="dashboard-setting-caret" icon={chevronForwardOutline} aria-hidden="true" />
                </button>
              ))}
            </div>
          </section>
        ))}

        <section className="dashboard-section-card dashboard-help-card">
          <h2 className="dashboard-section-title">Help</h2>
          <button type="button" className="dashboard-setting-row dashboard-help-row">
            <span className="dashboard-setting-label"><IonIcon icon={helpCircleOutline} aria-hidden="true" /><span>Echostream Support</span></span>
            <IonIcon className="dashboard-setting-caret" icon={chevronForwardOutline} aria-hidden="true" />
          </button>
        </section>
      </section>
    </main>
  );
}
