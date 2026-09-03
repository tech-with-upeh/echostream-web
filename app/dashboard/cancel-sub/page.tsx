"use client";

import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, checkmarkCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
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

export default function CancelSubscriptionPage() {
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
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const isOneTime = subscription?.type === "one_time";
  const endDate = formatDate(subscription?.subscription_ends_at ?? null);

  return (
    <main className="cancel-sub-page">
      <section className="cancel-sub-content">
        <Link href="/dashboard/subs-manage" className="cancel-sub-back">
          <IonIcon icon={arrowBackOutline} aria-hidden="true" />
          <span>Back</span>
        </Link>

        {loading ? (
          <div className="cancel-sub-card cancel-sub-loading" aria-live="polite">
            <span className="subs-spinner" role="status" aria-label="Loading subscription" />
          </div>
        ) : isOneTime ? (
          <div className="cancel-sub-card cancel-sub-one-time">
            <img
              src="/noreoccuring.svg"
              alt=""
              aria-hidden="true"
              className="cancel-sub-one-time-illustration"
            />
            <h1>No cancellation needed</h1>
            <p className="cancel-sub-intro">
              Your {subscription?.plan ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1).toLowerCase() : "current"} plan was purchased as a one-time payment, so there is no recurring subscription to cancel. You can continue using your plan until {endDate}.
            </p>
            <p className="cancel-sub-one-time-note">
              Once your current access expires, you can choose a new plan if you want to continue using EchoStream.
            </p>
          </div>
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
              <Link href="/dashboard/subs-manage" className="cancel-sub-account-btn">
                Back to account
              </Link>
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
