"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { checkmark, cardOutline } from "ionicons/icons";
import {
  ApiError,
  CurrentUser,
  getCurrentUser,
  getSessionSubscription,
  getSessionUser,
  getSubscriptionManagement,
  subscribeToPlan,
  upgradeSubscription,
  SubscriptionManagement,
  getUpgradeQuote,
  getVoucherCheckoutQuote,
  voucherCheckout,
  validateRedeemCode,
  RedeemValidation,
} from "@/lib/api";
import "../pricing/pricing.css";
import "./cart.css";

const PLANS = {
  essential: { name: "Essential", monthly: 1600, yearly: 16000 },
  pro: { name: "Pro", monthly: 3200, yearly: 32000 },
} as const;

type Duration = "month" | "year";

function money(value: number) { return `₦${Math.round(value).toLocaleString()}`; }
function humanize(value: string | null | undefined) {
  return value ? value.replace(/[_-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) : "Card";
}

export default function CartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedPlan = (searchParams.get("plan") || "essential").toLowerCase() as keyof typeof PLANS;
  const initialInterval: Duration = searchParams.get("interval") === "year" ? "year" : "month";
  const [user, setUser] = useState<CurrentUser | null>(() => getSessionUser());
  const [subscription, setSubscription] = useState<SubscriptionManagement | null>(() => getSessionSubscription());
  const [planKey, setPlanKey] = useState<keyof typeof PLANS>(PLANS[requestedPlan] ? requestedPlan : "essential");
  const [duration, setDuration] = useState<Duration>(initialInterval);
  const [quote, setQuote] = useState<Awaited<ReturnType<typeof getUpgradeQuote>> | null>(null);
  const [voucherQuote, setVoucherQuote] = useState<Awaited<ReturnType<typeof getVoucherCheckoutQuote>> | null>(null);
  const [loadingUser, setLoadingUser] = useState(!getSessionUser());
  const [loadingSubscription, setLoadingSubscription] = useState(!getSessionSubscription());
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [voucher, setVoucher] = useState<RedeemValidation | null>(null);
  const [validatingVoucher, setValidatingVoucher] = useState(false);

  useEffect(() => {
    let mounted = true;
    getCurrentUser().then((data) => mounted && setUser(data)).catch(() => mounted && setUser(getSessionUser())).finally(() => mounted && setLoadingUser(false));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!user) { setLoadingSubscription(false); return; }
    let mounted = true;
    getSubscriptionManagement().then((data) => mounted && setSubscription(data)).catch(() => mounted && setSubscription(getSessionSubscription())).finally(() => mounted && setLoadingSubscription(false));
    return () => { mounted = false; };
  }, [user]);

  const currentPlan = user?.plan?.toLowerCase() || "starter";
  const isRecurringSubscription = subscription?.type === "recurring";
  const paymentDetails = subscription?.payment_method_details;
  const hasCard = Boolean(paymentDetails?.last4);
  const paymentName = humanize(paymentDetails?.brand || paymentDetails?.card_type || subscription?.payment_method);
  const isUpgrade = !!user && currentPlan !== "starter" && (planKey === "pro" || planKey === "essential") &&
    ({ starter: 0, essential: 1, pro: 2 }[planKey] > ({ starter: 0, essential: 1, pro: 2 }[currentPlan] ?? 0));
  const isNewSubscription = !!user && !isUpgrade;

  useEffect(() => {
    if (!user || !isUpgrade) { setQuote(null); return; }
    let mounted = true;
    setLoadingQuote(true);
    setError("");
    getUpgradeQuote(planKey, duration, voucher?.type === "voucher" ? coupon.trim() : undefined)
      .then((data) => mounted && setQuote(data))
      .catch((err) => mounted && setError(err instanceof ApiError ? err.message : "Unable to calculate the upgrade."))
      .finally(() => mounted && setLoadingQuote(false));
    return () => { mounted = false; };
  }, [user, planKey, duration, isUpgrade, voucher, coupon]);

  useEffect(() => {
    if (!user || !isNewSubscription) { setVoucherQuote(null); return; }
    let mounted = true;
    setLoadingQuote(true);
    getVoucherCheckoutQuote(planKey, duration)
      .then((data) => mounted && setVoucherQuote(data))
      .catch((err) => mounted && setError(err instanceof ApiError ? err.message : "Unable to calculate checkout."))
      .finally(() => mounted && setLoadingQuote(false));
    return () => { mounted = false; };
  }, [user, planKey, duration, isNewSubscription]);

  const plan = PLANS[planKey];
  const listPrice = duration === "month" ? plan.monthly : plan.yearly;
  const monthlyEquivalent = Math.round(plan.yearly / 12);
  const annualSavings = plan.monthly * 12 - plan.yearly;
  const upgradeTotal = quote?.upgrade_amount ?? listPrice;
  const newCheckoutTotal = voucherQuote?.amount_due ?? listPrice;
  const credit = quote?.credit_applied ?? 0;
  const checkoutTotal = isUpgrade ? upgradeTotal : newCheckoutTotal;

  const applyVoucher = async () => {
    const code = coupon.trim();
    if (!code) return;
    setError("");
    setValidatingVoucher(true);
    try {
      const result = await validateRedeemCode(code);
      if (result.type !== "voucher") throw new ApiError("This is not a voucher code. Subscription codes must be redeemed from your dashboard.", 400);
      setVoucher(result);
    } catch (err) {
      setVoucher(null);
      setError(err instanceof ApiError ? err.message : "Unable to validate voucher.");
    } finally { setValidatingVoucher(false); }
  };

  const checkout = async () => {
    setError("");
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(`/cart?plan=${planKey}&interval=${duration}`)}`);
      return;
    }
    setCheckoutLoading(true);
    try {
      // Active paid subscriptions always use the upgrade flow. A new subscription
      // with account credit uses the dedicated voucher-credit checkout flow.
      const result = isUpgrade
        ? await upgradeSubscription(planKey, duration, voucher?.type === "voucher" ? coupon.trim() : undefined)
        : await voucherCheckout(planKey, duration);
      if (result.status === "payment_required" && result.authorization_url) { window.location.assign(result.authorization_url); return; }
      if (result.authorization_url) { window.location.assign(result.authorization_url); return; }
      if (result.reference) { router.push(`/payment/success?reference=${encodeURIComponent(result.reference)}`); return; }
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return;
      setError(err instanceof ApiError ? err.message : "Unable to start payment. Please try again.");
    } finally { setCheckoutLoading(false); }
  };

  if (loadingUser) return <main className="cart-page"><div className="cart-shell"><div className="cart-loading">Loading checkout…</div></div></main>;

  return (
    <main className="cart-page">
      <div className="cart-shell">
        <header className="cart-header"><h1>Your cart</h1><span>Review your plan and choose your billing duration.</span></header>
        {error && <div className="cart-error" role="alert">{error}</div>}
        <div className="cart-grid">
          <section className="cart-card">
            <div className="cart-card-heading"><div><h2>{plan.name}</h2><p className="cart-plan-label">EchoStream Plan</p></div><Image src="/logo.svg" alt="EchoStream" width={48} height={48} /></div>
            <div className="duration-section">
              <div className="duration-title"><span>Duration / Period</span><div className="duration-price-info">{duration === "year" && <small>Save {money(annualSavings)}</small>}<strong>{money(listPrice)}</strong></div></div>
              <div className="duration-select-wrap"><IonIcon className="duration-select-check" icon={checkmark} aria-hidden="true" /><select className="duration-select" value={duration} onChange={(e) => setDuration(e.target.value as Duration)} aria-label="Choose subscription duration"><option value="month">1 Month — {money(plan.monthly)}</option><option value="year">12 Months — {money(plan.yearly)}</option></select></div>
            </div>
            <div className="duration-deal-divider" />
            {duration === "month" && <div className="duration-deal"><p>Switch to annual billing for the <strong>biggest savings</strong>.</p><button type="button" className="duration-deal-button" onClick={() => setDuration("year")}>Get deal</button></div>}
            {isUpgrade && <div className="cart-credit-box">{loadingQuote ? "Calculating your upgrade…" : <>Current subscription credit: <strong>{money(quote?.unused_value ?? 0)}</strong></>}</div>}
            {isNewSubscription && voucherQuote && <div className="cart-credit-box">Account credit available: <strong>{money(voucherQuote.credit_available)}</strong>{voucherQuote.credit_applied > 0 && <> · Applied: <strong>{money(voucherQuote.credit_applied)}</strong></>}</div>}
            <p className="billing-copy">{duration === "year" ? `Billed every 12 months at ${money(listPrice)}. Equivalent to ${money(monthlyEquivalent)} per month.` : `Billed every month at ${money(listPrice)}.`}</p>
          </section>

          <aside className="summary-card">
            <h2>Order summary</h2>
            <div className="summary-row"><span>{plan.name} Plan</span><strong>{money(listPrice)}</strong></div>
            <div className="summary-row"><span>{duration === "month" ? "1 month" : "12 months"}</span><span>{duration === "year" ? "Annual" : "Monthly"}</span></div>
            <div className="summary-divider" />
            {isUpgrade && <>
              <div className="summary-row savings"><span>Unused subscription credit</span><strong>−{money(quote?.unused_value ?? 0)}</strong></div>
              {(quote?.account_credit_applied ?? 0) > 0 && <div className="summary-row savings"><span>Account credit</span><strong>−{money(quote?.account_credit_applied ?? 0)}</strong></div>}
              {(quote?.voucher_credit_applied ?? 0) > 0 && <div className="summary-row savings"><span>Voucher credit</span><strong>−{money(quote?.voucher_credit_applied ?? 0)}</strong></div>}
            </>}
            {!isUpgrade && (voucherQuote?.credit_applied ?? 0) > 0 && <div className="summary-row savings"><span>Account credit</span><strong>−{money(voucherQuote?.credit_applied ?? 0)}</strong></div>}
            {!isUpgrade && duration === "year" && <div className="summary-row savings"><span>Annual savings</span><strong>−{money(annualSavings)}</strong></div>}
            <div className="summary-total"><span>{isUpgrade ? "Pay now" : "Total"}</span><strong>{loadingQuote ? "…" : money(checkoutTotal)}</strong></div>

            {isUpgrade && <>
              <button type="button" className="coupon-link" onClick={() => setCouponOpen((open) => !open)} aria-expanded={couponOpen}>Use voucher code</button>
              {couponOpen && <div className="coupon-input-wrap"><input type="text" value={coupon} onChange={(e) => { setCoupon(e.target.value); setVoucher(null); }} placeholder="Enter voucher code" aria-label="Voucher code" autoFocus /><button type="button" onClick={applyVoucher} disabled={validatingVoucher}>{validatingVoucher ? "Checking…" : "Apply"}</button></div>}
              {voucher && <p className="billing-copy">Voucher applied: {money(voucher.credit)} credit.</p>}
            </>}

            {user && isRecurringSubscription && !loadingSubscription && <section className="cart-payment-method" aria-label="Subscription payment method">
              <div className="cart-payment-method-header"><div><span className="cart-payment-eyebrow">PAYMENT METHOD</span><h3>Subscription card</h3></div><IonIcon icon={cardOutline} aria-hidden="true" /></div>
              <div className="cart-payment-method-body"><div className="cart-payment-card-icon" aria-hidden="true"><IonIcon icon={cardOutline} /></div><div className="cart-payment-details"><strong>{hasCard ? paymentName : "No card added"}</strong><span>{hasCard ? `•••• ${paymentDetails?.last4}` : "Add a card for future recurring payments."}</span></div><button type="button" className="cart-payment-action" onClick={() => router.push("/dashboard/subs-manage")}>{hasCard ? "Change" : "Add card"}</button></div>
            </section>}

            <button type="button" className="checkout-button" onClick={checkout} disabled={checkoutLoading || loadingQuote || (isUpgrade && !quote)}>
              {checkoutLoading ? "Opening secure checkout…" : !user ? "Continue to login" : isUpgrade ? (checkoutTotal > 0 ? "Continue to payment" : "Apply upgrade") : (checkoutTotal > 0 ? "Continue to checkout" : "Use credit & subscribe")}
              <span>→</span>
            </button>
            <p className="secure-note">Secure payment · Cancel anytime</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
