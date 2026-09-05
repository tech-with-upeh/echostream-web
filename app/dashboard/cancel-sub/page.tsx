"use client";

import { IonIcon } from "@ionic/react";
import { arrowBackOutline, checkmarkCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavbar";
import {
  cacheSubscriptionManagement,
  getSessionSubscription,
  getSubscriptionManagement,
  SubscriptionManagement,
} from "@/lib/api";
import "../dashboard-ui.css";
import "../dashboard.css";
import "./cancel-sub.css";

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatPlan(value: string | null | undefined) {
  if (!value) return "current";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function isCancelledPaymentMethod(value: string | null | undefined) {
  return [
    "cancel",
    "canceled",
    "cancelled",
    "non_renewing",
    "non-renewing",
  ].includes((value || "").trim().toLowerCase());
}

function ExpiringSubscriptionNotice({ oneTime }: { oneTime: boolean }) {
  return (
    <div className="cancel-sub-expiring-notice">
      <img
        src="/noreoccuring.svg"
        alt="No recurring payment"
        className="cancel-sub-expiring-illustration"
      />
      <p>
        {oneTime
          ? "Your current subscription will expire after the billing period. Please add a payment method."
          : "Your current subscription is cancelled and will expire after the billing period. Please add a payment method."}
      </p>
      <button
        type="button"
        className="cancel-sub-change-plan"
        onClick={() => window.location.assign("/pricing")}
      >
        Change plan
      </button>
    </div>
  );
}

export default function CancelSubscriptionPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionManagement | null>(
    () => getSessionSubscription(),
  );
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
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const isOneTime = subscription?.type === "one_time";
  const paymentMethodCancelled = isCancelledPaymentMethod(
    subscription?.payment_method,
  );
  const needsPaymentMethod = isOneTime || paymentMethodCancelled;
  const endDate = formatDate(subscription?.subscription_ends_at ?? null);
  const plan = formatPlan(subscription?.plan);

  return (
    <main className="cancel-sub-page">
      <DashboardNavbar />
      <section className="cancel-sub-content">
        <button
          type="button"
          className="cancel-sub-back"
          onClick={() => router.push("/dashboard/subs-manage")}
        >
          <IonIcon icon={arrowBackOutline} aria-hidden="true" />
          <span>Back</span>
        </button>

        {loading ? (
          <div className="cancel-sub-card cancel-sub-loading" aria-live="polite">
            <span
              className="subs-spinner"
              role="status"
              aria-label="Loading subscription"
            />
          </div>
        ) : needsPaymentMethod ? (
          <>
            <div className="cancel-sub-card cancel-sub-plan-card">
              <span className="cancel-sub-eyebrow">CURRENT PLAN</span>
              <h1>{plan} Plan</h1>
              <p className="cancel-sub-intro">
                Your current plan remains active until {endDate}.
              </p>
            </div>
            <ExpiringSubscriptionNotice oneTime={isOneTime} />
          </>
        ) : (
          <div className="cancel-sub-card">
            <h1>How your Stream will change</h1>
            <p className="cancel-sub-intro">
              If you cancel, you'll switch over to our free service on {endDate}. Here's how your listening will change:
            </p>

            <div className="cancel-sub-changes">
              <div className="cancel-sub-change">
                <IonIcon icon={checkmarkCircleOutline} aria-hidden="true" />
                <p>You won't be able to use custom voice clones.</p>
              </div>
              <div className="cancel-sub-change">
                <IonIcon icon={checkmarkCircleOutline} aria-hidden="true" />
                <p>You'll be restricted to the features available on the free plan.</p>
              </div>
              <div className="cancel-sub-change">
                <IonIcon icon={checkmarkCircleOutline} aria-hidden="true" />
                <p>Premium features will no longer be available after your current billing period ends.</p>
              </div>
              <div className="cancel-sub-change">
                <IonIcon icon={checkmarkCircleOutline} aria-hidden="true" />
                <p>Your account and existing data will remain available.</p>
              </div>
            </div>

            <div className="cancel-sub-actions">
              <button
                type="button"
                className="cancel-sub-account-btn"
                onClick={() => router.push("/dashboard/subs-manage")}
              >
                Back to account
              </button>
              <button type="button" className="cancel-sub-confirm-btn">
                Continue to cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
