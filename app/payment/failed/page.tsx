"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentFailedContent() {
  const params = useSearchParams();
  const reference = params.get("reference");

  return (
    <main className="cart-page">
      <div className="cart-shell">
        <section className="summary-card" style={{ maxWidth: 620, margin: "80px auto", textAlign: "center" }}>
          <h1>Payment not completed</h1>
          <p style={{ marginTop: 16 }}>Your payment was not completed. You can return to the cart and try again.</p>
          {reference && <p style={{ marginTop: 8, opacity: 0.7 }}>Reference: {reference}</p>}
          <Link href="/cart" className="checkout-button" style={{ display: "inline-flex", marginTop: 28 }}>
            Return to cart <span>→</span>
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense
      fallback={
        <main className="cart-page">
          <div className="cart-shell">
            <section className="summary-card" style={{ maxWidth: 620, margin: "80px auto", textAlign: "center" }}>
              <h1>Payment not completed</h1>
            </section>
          </div>
        </main>
      }
    >
      <PaymentFailedContent />
    </Suspense>
  );
}