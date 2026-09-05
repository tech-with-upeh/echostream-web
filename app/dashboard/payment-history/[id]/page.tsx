"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, checkmarkCircleOutline, copyOutline, downloadOutline } from "ionicons/icons";
import DashboardNavbar from "@/components/DashboardNavbar";
import { getPaymentReceipt, type PaymentReceiptResponse } from "@/lib/api";
import "../../dashboard-ui.css";
import "../../dashboard.css";
import "../payment-history.css";
import "./receipt.css";

const formatPlan = (value: string) => value.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const formatInterval = (value: string | null) => !value ? "One-time" : value.toLowerCase() === "month" ? "Monthly" : value.toLowerCase() === "year" ? "Yearly" : formatPlan(value);
const formatDate = (value: string | null) => value ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const formatDateTime = (value: string | null) => value ? new Date(value).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
const formatAmount = (amount: number | null, currency: string) => { const value = amount === null ? 0 : currency.toUpperCase() === "NGN" ? amount / 100 : amount; return new Intl.NumberFormat("en-NG", { style: "currency", currency: currency.toUpperCase(), minimumFractionDigits: 2 }).format(value); };
const humanize = (value: string | null) => value ? value.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) : "—";

export default function PaymentReceiptPage() {
  const params = useParams<{ id: string }>();
  const paymentId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [receipt, setReceipt] = useState<PaymentReceiptResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!paymentId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    getPaymentReceipt(paymentId).then((data) => { if (!cancelled) setReceipt(data); }).catch((requestError) => { if (!cancelled) setError(requestError instanceof Error ? requestError.message : "Unable to load this receipt."); }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [paymentId]);

  const payment = receipt?.payment;
  const subscription = receipt?.subscription;
  const paid = payment?.status?.toLowerCase() === "success" || payment?.status?.toLowerCase() === "paid" || payment?.status?.toLowerCase() === "successful";
  const title = useMemo(() => payment ? `${formatPlan(payment.plan)} plan` : "Payment receipt", [payment]);

  const copyPaymentId = async () => {
    if (!payment?.payment_id) return;
    try { await navigator.clipboard.writeText(payment.payment_id); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  if (loading) return <main className="payment-history-page"><DashboardNavbar /><section className="receipt-content"><Link href="/dashboard/payment-history" className="payment-history-back"><IonIcon icon={arrowBackOutline} /><span>Back to payment history</span></Link><div className="receipt-state">Loading receipt…</div></section></main>;
  if (error || !receipt || !payment) return <main className="payment-history-page"><DashboardNavbar /><section className="receipt-content"><Link href="/dashboard/payment-history" className="payment-history-back"><IonIcon icon={arrowBackOutline} /><span>Back to payment history</span></Link><div className="receipt-state"><h1>Receipt unavailable</h1><p>{error ?? "We couldn't find this payment."}</p><Link href="/dashboard/payment-history" className="receipt-secondary-button">Back to payment history</Link></div></section></main>;

  return (
    <main className="payment-history-page">
      <DashboardNavbar />
      <section className="receipt-content">
        <Link href="/dashboard/payment-history" className="payment-history-back"><IonIcon icon={arrowBackOutline} /><span>Back to payment history</span></Link>

        <div className="receipt-heading">
          <span>PAYMENT RECEIPT</span>
          <h1>Payment receipt</h1>
          <p>Your EchoStream payment confirmation and transaction details.</p>
        </div>

        <article className="receipt-card">
          <header className="receipt-card-header">
            <div>
              <div className="receipt-brand">Echostream</div>
              <p>Payment receipt</p>
            </div>
            <div className={`receipt-paid-badge ${paid ? "is-paid" : ""}`}><IonIcon icon={checkmarkCircleOutline} />{humanize(payment.status)}</div>
          </header>

          <section className="receipt-total">
            <span>Total paid</span>
            <strong>{formatAmount(payment.amount, payment.currency)}</strong>
            <small>{formatDateTime(payment.paid_at)}</small>
          </section>

          <section className="receipt-grid">
            <div className="receipt-panel">
              <span className="receipt-label">Customer</span>
              <strong>{receipt.customer.name}</strong>
              <p>{receipt.customer.email}</p>
            </div>
            <div className="receipt-panel">
              <span className="receipt-label">Plan</span>
              <strong>{title}</strong>
              <p>{formatInterval(payment.interval)} · {humanize(payment.billing_type)}</p>
            </div>
          </section>

          <section className="receipt-details">
            <div className="receipt-section-title">Transaction details</div>
            <div className="receipt-detail-row"><span>Receipt number</span><strong>{payment.receipt_number}</strong></div>
            <div className="receipt-detail-row receipt-detail-copy"><span>EchoStream payment ID</span><strong>{payment.payment_id}</strong><button type="button" onClick={copyPaymentId} aria-label="Copy EchoStream payment ID"><IonIcon icon={copyOutline} />{copied ? "Copied" : ""}</button></div>
            <div className="receipt-detail-row"><span>Payment provider</span><strong>{humanize(payment.provider)}</strong></div>
            <div className="receipt-detail-row"><span>Payment method</span><strong>{humanize(payment.method)}</strong></div>
            <div className="receipt-detail-row"><span>Provider reference</span><strong>{payment.provider_reference}</strong></div>
            <div className="receipt-detail-row"><span>Paid on</span><strong>{formatDateTime(payment.paid_at)}</strong></div>
          </section>

          {(subscription?.starts_at || subscription?.ends_at) && (
            <section className="receipt-details">
              <div className="receipt-section-title">Access period</div>
              <div className="receipt-detail-row"><span>Starts</span><strong>{formatDate(subscription.starts_at)}</strong></div>
              <div className="receipt-detail-row"><span>Ends</span><strong>{formatDate(subscription.ends_at)}</strong></div>
            </section>
          )}

          <footer className="receipt-footer"><span>Issued {formatDateTime(receipt.issued_at)}</span><span>Keep this receipt for your records.</span></footer>
        </article>

        <div className="receipt-actions">
          <button type="button" className="receipt-primary-button" onClick={() => window.print()}><IonIcon icon={downloadOutline} />Print / save receipt</button>
        </div>
      </section>
    </main>
  );
}
