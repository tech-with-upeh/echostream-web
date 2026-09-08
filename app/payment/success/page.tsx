"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyPayment, verifyVoucherCheckout } from "@/lib/api";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const reference = params.get("reference");
  const flow = params.get("flow");
  const [status, setStatus] = useState("Verifying your payment…");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!reference) {
      setError("No payment reference was provided.");
      return;
    }

    const verify = flow === "redeem" ? verifyVoucherCheckout : verifyPayment;

    verify(reference)
      .then((result) => {
        if (result.status === "success") {
          setStatus("Payment confirmed. Your EchoStream plan is now active.");
        } else {
          setError(`Payment status: ${result.status}.`);
        }
      })
      .catch((err) => setError(err instanceof Error ? err.message : "We could not verify this payment yet."));
  }, [reference, flow]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <section className="w-full max-w-md flex flex-col items-center text-center">
        <img src="/success.svg" alt="Successful Payment" className="w-24 h-24 mb-8" />
        {error ? <h1 className="text-xl font-semibold tracking-tight text-neutral-900">Payment needs attention</h1> : null}
        <p className="mt-3 text-base text-neutral-500 leading-relaxed">{error || status}</p>
        <Link href="/dashboard" className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors duration-200">
          Go to dashboard
          <span className="translate-y-[0.5px]">→</span>
        </Link>
      </section>
    </main>
  );
}
