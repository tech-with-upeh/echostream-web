"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyPayment } from "@/lib/api";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const reference = params.get("reference");
  const [status, setStatus] = useState("Verifying your payment…");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reference) {
      setError("No payment reference was provided.");
      return;
    }
    verifyPayment(reference)
      .then((result) => {
        if (result.status === "success") setStatus("Payment confirmed. Your EchoStream plan is now active.");
        else setError(`Payment status: ${result.status}.`);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "We could not verify this payment yet."));
  }, [reference]);

  return (
    <main className="cart-page">
      <div className="cart-shell">
        <section className="summary-card flex flex-col justify-center items-center" style={{ maxWidth: 620, margin: "80px auto", textAlign: "center" }}>
          <img className="h-1/3 w-1/3 self-center content-center" src="/success.svg" alt="Successful Payment" />
          <h1>{error ? "Payment needs attention" : ""}</h1>
          <p style={{ marginTop: 16 }}>{error || status}</p>
          <Link href="/dashboard" className="checkout-button" style={{ display: "inline-flex", marginTop: 28 }}>Go to dashboard <span>→</span></Link>
        </section>
      </div>
    </main>
  );
}
