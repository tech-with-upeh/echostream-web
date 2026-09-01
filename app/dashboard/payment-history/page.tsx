"use client";

import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, cardOutline, checkmarkCircleOutline } from "ionicons/icons";
import DashboardNavbar from "@/components/DashboardNavbar";
import "../dashboard-ui.css";
import "../dashboard.css";
import "./payment-history.css";

const PAYMENTS = [
  { date: "04/08/2026", description: "Essential Plan — 1 month", method: "Mastercard •••• 563", amount: "₦1,600.00", status: "Paid" },
  { date: "04/07/2026", description: "Essential Plan — 1 month", method: "Mastercard •••• 563", amount: "₦1,600.00", status: "Paid" },
  { date: "04/06/2026", description: "Essential Plan — 1 month", method: "Mastercard •••• 563", amount: "₦1,600.00", status: "Paid" },
];

export default function PaymentHistoryPage() {
  return (
    <main className="payment-history-page">
      <section className="payment-history-content">
        <Link href="/dashboard" className="payment-history-back">
          <IonIcon icon={arrowBackOutline} aria-hidden="true" />
          <span>Back</span>
        </Link>

        <header className="payment-history-header">
          <span>PAYMENTS</span>
          <h1>Payment history</h1>
          <p>View your previous EchoStream subscription payments.</p>
        </header>

        <section className="payment-history-card">
          <div className="payment-history-card-heading">
            <div className="payment-heading-icon"><IonIcon icon={cardOutline} /></div>
            <div>
              <h2>Payment history</h2>
              <p>Your recent transactions</p>
            </div>
          </div>

          <div className="payment-list">
            {PAYMENTS.map((payment) => (
              <div className="payment-row" key={payment.date}>
                <div className="payment-row-main">
                  <div className="payment-status-icon"><IonIcon icon={checkmarkCircleOutline} /></div>
                  <div>
                    <h3>{payment.description}</h3>
                    <p>{payment.date} · {payment.method}</p>
                  </div>
                </div>
                <div className="payment-row-amount">
                  <strong>{payment.amount}</strong>
                  <span>{payment.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
