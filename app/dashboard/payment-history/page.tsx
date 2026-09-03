"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, cardOutline, checkmarkCircleOutline, ellipsisHorizontal, receiptOutline } from "ionicons/icons";
import DashboardNavbar from "@/components/DashboardNavbar";
import { getPaymentHistory, type PaymentHistoryItem } from "@/lib/api";
import "../dashboard-ui.css";
import "../dashboard.css";
import "./payment-history.css";

type PaymentStatus = "Paid" | "Refund pending" | "Refunded" | "Refund declined";

type Payment = {
  id: number;
  reference: string;
  date: string;
  description: string;
  period: string;
  method: string;
  amount: number;
  status: PaymentStatus;
};

const PER_PAGE = 20;

const formatPlan = (plan: string) =>
  plan
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatInterval = (interval: string | null) => {
  if (!interval) return "One-time";
  const normalized = interval.toLowerCase();
  if (normalized === "month" || normalized === "monthly") return "Monthly";
  if (normalized === "year" || normalized === "yearly" || normalized === "annual") return "Yearly";
  return formatPlan(interval);
};

const addBillingInterval = (date: Date, interval: string | null) => {
  const result = new Date(date);
  if (!interval) return result;

  const normalized = interval.toLowerCase();
  if (normalized === "month" || normalized === "monthly") {
    result.setMonth(result.getMonth() + 1);
  } else if (normalized === "year" || normalized === "yearly" || normalized === "annual") {
    result.setFullYear(result.getFullYear() + 1);
  }
  return result;
};

const formatPeriod = (item: PaymentHistoryItem) => {
  if (!item.paid_at || !item.interval) return "One-time payment";

  const start = new Date(item.paid_at);
  const end = addBillingInterval(start, item.interval);
  return `${start.toLocaleDateString("en-GB")} – ${end.toLocaleDateString("en-GB")}`;
};

const formatMethod = (item: PaymentHistoryItem) => {
  const method = item.payment_method === "one_time" ? "One-time" : item.payment_method === "recurring" ? "Recurring" : item.payment_method;
  return [method, item.channel].filter(Boolean).join(" · ") || "Payment";
};

const normalizeStatus = (status: string): PaymentStatus => {
  switch (status.toLowerCase()) {
    case "success":
    case "successful":
    case "paid":
      return "Paid";
    case "refund_pending":
    case "refund pending":
      return "Refund pending";
    case "refunded":
      return "Refunded";
    case "refund_declined":
    case "refund declined":
      return "Refund declined";
    default:
      return "Paid";
  }
};

const toPayment = (item: PaymentHistoryItem): Payment => ({
  id: item.id,
  reference: item.reference,
  date: item.paid_at ?? item.created_at,
  description: `${formatPlan(item.plan)} Plan`,
  period: formatPeriod(item),
  method: formatMethod(item),
  amount: item.amount ?? 0,
  status: normalizeStatus(item.status),
});

const formatAmount = (amount: number, currency = "NGN") => {
  const value = currency.toUpperCase() === "NGN" ? amount / 100 : amount;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(value);
};

export default function PaymentHistoryPage() {
  const [sort, setSort] = useState("paid");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getPaymentHistory(page, PER_PAGE)
      .then((response) => {
        if (cancelled) return;
        setPayments(response.items.map(toPayment));
        setTotal(response.total);
      })
      .catch((requestError) => {
        if (cancelled) return;
        setError(requestError instanceof Error ? requestError.message : "Unable to load payment history.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  const sortedPayments = useMemo(() => {
    const list = [...payments];
    if (sort === "paid") {
      return list.sort((a, b) => Number(b.status === "Paid") - Number(a.status === "Paid") || b.date.localeCompare(a.date));
    }
    if (sort === "newest") return list.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "oldest") return list.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "highest") return list.sort((a, b) => b.amount - a.amount);
    if (sort === "lowest") return list.sort((a, b) => a.amount - b.amount);
    return list;
  }, [payments, sort]);

  const totalPages = Math.ceil(total / PER_PAGE);

  const copyReference = async (reference: string) => {
    try {
      await navigator.clipboard.writeText(reference);
      setOpenMenu(null);
    } catch {
      // Clipboard access may be unavailable in some browsers/contexts.
    }
  };

  return (
    <main className="payment-history-page">
      <DashboardNavbar />
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
                <p>{loading ? "Loading transactions…" : `${total} transaction${total === 1 ? "" : "s"}`}</p>
              </div>
            </div>

            <label className="payment-sort">
              <span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)} disabled={loading || payments.length === 0}>
                <option value="paid">Status: Paid</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="highest">Amount: high to low</option>
                <option value="lowest">Amount: low to high</option>
              </select>
            </label>
          </div>

          <div className="payment-list">
            {loading && <div className="payment-history-state">Loading payment history…</div>}

            {!loading && error && (
              <div className="payment-history-state payment-history-error">{error}</div>
            )}

            {!loading && !error && sortedPayments.length === 0 && (
              <div className="payment-history-state">
                <h3>No payments yet</h3>
                <p>Your completed payments will appear here.</p>
              </div>
            )}

            {!loading && !error && sortedPayments.map((payment) => (
              <article className="payment-row" key={payment.id}>
                <div className="payment-row-main">
                  <div className="payment-status-icon"><IonIcon icon={checkmarkCircleOutline} /></div>
                  <div className="payment-details">
                    <h3>{payment.description}</h3>
                    <p>Billing period: {payment.period}</p>
                    <p>Paid {new Date(payment.date).toLocaleDateString("en-GB")} · {payment.method}</p>
                    <p>Payment reference: <strong>{payment.reference}</strong></p>
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
                      <Link href={`/dashboard/payment-history/${payment.id}`}>View payment details</Link>
                      <button type="button" onClick={() => copyReference(payment.reference)}>Copy payment reference</button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {!loading && !error && totalPages > 1 && (
            <div className="payment-history-pagination">
              <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages}>
                Next
              </button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
