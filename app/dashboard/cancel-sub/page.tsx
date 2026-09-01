"use client";

import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, checkmarkCircleOutline } from "ionicons/icons";
import DashboardNavbar from "@/components/DashboardNavbar";
import "../dashboard-ui.css";
import "./cancel-sub.css";

export default function CancelSubscriptionPage() {
  return (
    <main className="cancel-sub-page">
      <DashboardNavbar />

      <section className="cancel-sub-content">
        <Link href="/dashboard/subs-manage" className="cancel-sub-back">
          <IonIcon icon={arrowBackOutline} aria-hidden="true" />
          <span>Back</span>
        </Link>

        <div className="cancel-sub-card">
          <span className="cancel-sub-eyebrow">CANCELLING YOUR PLAN</span>
          <h1>How your Stream will change</h1>
          <p className="cancel-sub-intro">
            If you cancel, you'll switch over to our free service on 04/09/2026. Here's how your listening will change:
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
      </section>
    </main>
  );
}
