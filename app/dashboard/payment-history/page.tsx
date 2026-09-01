"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, cardOutline, checkmarkCircleOutline, downloadOutline, ellipsisHorizontal, receiptOutline } from "ionicons/icons";
import DashboardNavbar from "@/components/DashboardNavbar";
import "../dashboard-ui.css";
import "../dashboard.css";
import "./payment-history.css";

type PaymentStatus = "Paid" | "Refund pending" | "Refunded" | "Refund declined";

type Payment = {
  id: string;
  invoiceId: string;
  date: string;
  description: string;
  period: string;
  method: string;
  amount: number;
  status: PaymentStatus;
};

const PAYMENTS: Payment[] = [
  { id: "payment_001", invoiceId: "INV-2026-000123", date: "2026-08-04", description: "Essential Plan", period: "04/08/2026 – 04/09/2026", method: "Mastercard •••• 563", amount: 1600, status: "Paid" },
  { id: "payment_002", invoiceId: "INV-2026-000097", date: "2026-07-04", description: "Essential Plan", period: "04/07/2026 – 04/08/2026", method: "Mastercard •••• 563", amount: 1600, status: "Paid" },
  { id: "payment_003", invoiceId: "INV-2026-000071", date: "2026-06-04", description: "Essential Plan", period: "04/06/2026 – 04/07/2026", method: "Mastercard •••• 563", amount: 1600, status: "Paid" },
];

const formatAmount = (amount: number) => `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

export default function PaymentHistoryPage() {
  const [sort, setSort] = useState("paid");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const sortedPayments = useMemo(() => {
    const list = [...PAYMENTS];
    if (sort === "paid") {
      return list.sort((a, b) => Number(b.status === "Paid") - Number(a.status === "Paid") || b.date.localeCompare(a.date));
    }
    if (sort === "newest") return list.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "oldest") return list.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "highest") return list.sort((a, b) => b.amount - a.amount);
    if (sort === "lowest") return list.sort((a, b) => a.amount - b.amount);
    return list;
  }, [sort]);

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
          <p>View receipts, invoices and details for your EchoStream payments.</p>
        </header>

        <section className="payment-history-card">
          <div className="payment-history-toolbar">
            <div className="payment-history-card-heading">
              <div className="payment-heading-icon"><IonIcon icon={cardOutline} /></div>
              <div>
                <h2>Payment history</h2>
                <p>{PAYMENTS.length} transactions</p>
              </div>
            </div>

            <label className="payment-sort">
              <span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="paid">Status: Paid</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="highest">Amount: high to low</option>
                <option value="lowest">Amount: low to high</option>
              </select>
            </label>
          </div>

          <div className="payment-list">
            {sortedPayments.map((payment) => (
              <article className="payment-row" key={payment.id}>
                <div className="payment-row-main">
                  <div className="payment-status-icon"><IonIcon icon={checkmarkCircleOutline} /></div>
                  <div className="payment-details">
                    <h3>{payment.description}</h3>
                    <p>Billing period: {payment.period}</p>
                    <p>Paid {new Date(payment.date).toLocaleDateString("en-GB")} · {payment.method}</p>
                    <p>Invoice ID: <strong>{payment.invoiceId}</strong></p>
                  </div>
                </div>

                <div className="payment-row-amount">
                  <strong>{formatAmount(payment.amount)}</strong>
                  <span className={`payment-status payment-status-${payment.status.toLowerCase().replaceAll(" ", "-")}`}>{payment.status}</span>
                </div>

                <div className="payment-actions">
                  <Link href={`/dashboard/payment-history/${payment.id}`} className="payment-receipt-action">
                    <IonIcon icon={receiptOutline} />
                    <span>View receipt</span>
                  </Link>
                  <button type="button" className="payment-menu-button" aria-label="More payment options" onClick={() => setOpenMenu(openMenu === payment.id ? null : payment.id)}>
                    <IonIcon icon={ellipsisHorizontal} />
                  </button>
                  {openMenu === payment.id && (
                    <div className="payment-menu">
                      <Link href={`/dashboard/payment-history/${payment.id}`}>View invoice</Link>
                      <button type="button"><IonIcon icon={downloadOutline} /> Download invoice</button>
                      <button type="button">Copy invoice ID</button>
                      <button type="button">Request refund</button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
