"use client";

import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, cardOutline } from "ionicons/icons";
import DashboardNavbar from "@/components/DashboardNavbar";
import "../dashboard-ui.css";
import "../../subs-manage/subs-manage.css";

export default function SubscriptionManagePage() {
  return (
    <main className="subs-manage-page">
      <DashboardNavbar />

      <section className="subs-manage-content">
        <Link href="/dashboard" className="subs-back-button">
          <IonIcon icon={arrowBackOutline} aria-hidden="true" />
          <span>Back</span>
        </Link>

        <section className="subs-plan-card">
          <div className="subs-plan-top">
            <span className="subs-eyebrow">CURRENT PLAN</span>
            <div className="subs-plan-brand">
              <img src="/logo.svg" alt="" aria-hidden="true" />
              <div>
                <h1>Essential</h1>
                <p>EchoStream Plan</p>
              </div>
            </div>
            <p className="subs-plan-description">
              Your current plan gives you everything you need for your streams, including premium voices and enhanced features.
            </p>
          </div>
          <div className="subs-plan-bottom">
            <div>
              <span>Next bill</span>
              <strong>₦1,600.00</strong>
              <small>04/09/2026</small>
            </div>
            <Link href="/pricing" className="subs-change-plan">Change plan</Link>
          </div>
        </section>

        <section className="subs-cancel-section">
          <div>
            <h2>Cancel subscription</h2>
            <p>Cancel your Essential plan. You’ll continue to have access until the end of your current billing period.</p>
          </div>
          <button type="button" className="subs-cancel-button">Cancel subscription</button>
        </section>

        <section className="subs-payment-card">
          <div className="subs-payment-heading">
            <span className="subs-eyebrow">PAYMENTS</span>
            <h2>Payment</h2>
            <p>Your next bill is for <strong>₦1,600.00</strong> on <strong>04/09/2026.</strong></p>
          </div>

          <hr />

          <div className="subs-payment-method">
            <div className="subs-card-icon" aria-hidden="true">
              <IonIcon icon={cardOutline} />
            </div>
            <div className="subs-card-info">
              <span>Mastercard</span>
              <strong>****563 <b>|</b> Exp: 12/23</strong>
            </div>
            <button type="button" className="subs-update-card">Update</button>
          </div>
        </section>
      </section>
    </main>
  );
}
