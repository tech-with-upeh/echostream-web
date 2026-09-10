"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
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
  redeemCode,
  RedeemValidation,
} from "@/lib/api";
import "../pricing/pricing.css";
import "./cart.css";

const PLANS = {
  essential: { name: "Essential", monthly: 5, yearly: 60 },
  pro: { name: "Pro", monthly: 10, yearly: 120 },
} as const;

const PLAN_RANK = { starter: 0, essential: 1, pro: 2 } as const;

type Duration = "month" | "year";

function money(value: number) {
  return `$${Math.round(value).toLocaleString()}`;
}

function humanize(value: string | null | undefined) {
  return value
    ? value
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "Card";
}

function CartPageContent() {
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
    getCurrentUser()
      .then((data) => mounted && setUser(data))
      .catch(() => mounted && setUser(getSessionUser()))
      .finally(() => mounted && setLoadingUser(false));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!user) {
      setLoadingSubscription(false);
      return;
    }
    let mounted = true;
    getSubscriptionManagement()
      .then((data) => mounted && setSubscription(data))
      .catch(() => mounted && setSubscription(getSessionSubscription()))
      .finally(() => mounted && setLoadingSubscription(false));
    return () => { mounted = false; };
  }, [user]);

  const currentPlan = user?.plan?.toLowerCase() || "starter";

  const isRecurringSubscription =
    subscription?.type === "recurring" &&
    subscription?.subscription_code != null;

  const paymentDetails = subscription?.payment_method_details;
  const hasCard = Boolean(paymentDetails?.last4);
  const paymentName = humanize(
    paymentDetails?.brand || paymentDetails?.card_type || subscription?.payment_method,
  );

  const isUpgrade =
    !!user &&
    currentPlan !== "starter" &&
    (planKey === "pro" || planKey === "essential") &&
    (PLAN_RANK[planKey] > (PLAN_RANK[currentPlan as keyof typeof PLAN_RANK] ?? 0));

  const isNewSubscription = !!user && !isUpgrade;

  useEffect(() => {
    if (!user || !isUpgrade) {
      setQuote(null);
      return;
    }

    let mounted = true;
    setLoadingQuote(true);
    setError("");

    getUpgradeQuote(
      planKey,
      duration,
      voucher?.type === "voucher" ? coupon.trim() : undefined,
    )
      .then((data) => mounted && setQuote(data))
      .catch((err) => {
        if (mounted) {
          setQuote(null);
          setError(err instanceof ApiError ? err.message : "Unable to calculate the upgrade.");
        }
      })
      .finally(() => mounted && setLoadingQuote(false));

    return () => { mounted = false; };
  }, [user, planKey, duration, isUpgrade, voucher, coupon]);

  useEffect(() => {
    if (!user || !isNewSubscription) {
      setVoucherQuote(null);
      return;
    }

    let mounted = true;
    setLoadingQuote(true);
    setError("");

    getVoucherCheckoutQuote(planKey, duration)
      .then((data) => mounted && setVoucherQuote(data))
      .catch((err) => {
        if (mounted) {
          setVoucherQuote(null);
          setError(err instanceof ApiError ? err.message : "Unable to calculate checkout.");
        }
      })
      .finally(() => mounted && setLoadingQuote(false));

    return () => { mounted = false; };
  }, [user, planKey, duration, isNewSubscription]);

  const plan = PLANS[planKey];
  const listPrice = duration === "month" ? plan.monthly : plan.yearly;
  const monthlyEquivalent = Math.round(plan.yearly / 12);
  const annualSavings = plan.monthly * 12 - plan.yearly;

  const upgradeTotal = quote?.upgrade_amount ?? listPrice;
  const newCheckoutTotal = voucherQuote?.amount_due ?? listPrice;
  const checkoutTotal = isUpgrade ? upgradeTotal : newCheckoutTotal;

  const applyVoucher = async () => {
    const code = coupon.trim();
    if (!code) return;

    setError("");
    setVoucher(null);
    setValidatingVoucher(true);

    try {
      const result = await validateRedeemCode(code);
      setVoucher(result);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to validate redeem code.");
    } finally {
      setValidatingVoucher(false);
    }
  };

  const checkout = async () => {
    setError("");

    if (!user) {
      router.push(`/login?next=${encodeURIComponent(`/cart?plan=${planKey}&interval=${duration}`)}`);
      return;
    }

    setCheckoutLoading(true);

    try {
      let result;

      if (isUpgrade) {
        result = await upgradeSubscription(
          planKey,
          duration,
          voucher?.type === "voucher" ? coupon.trim() : undefined,
        );
      } else if (voucher?.type === "subscription") {
        const redeemed = await redeemCode(coupon.trim());
        if (redeemed.success) {
          router.push("/dashboard");
          return;
        }
        throw new ApiError("Unable to redeem this subscription code.", 400);
      } else if (voucher?.type === "voucher") {
        await redeemCode(coupon.trim());
        result = await voucherCheckout(planKey, duration);
      } else if ((voucherQuote?.credit_applied ?? 0) > 0) {
        result = await voucherCheckout(planKey, duration);
      } else {
        result = await subscribeToPlan(planKey, duration);
      }

      if ("payment_method" in result && "status" in result && result.status === "success" && result.payment_method === "voucher_credit") {
        router.push("/dashboard");
        return;
      }

      if ("status" in result && result.status === "payment_required" && result.authorization_url) {
        window.location.assign(result.authorization_url);
        return;
      }

      if (result.authorization_url) {
        window.location.assign(result.authorization_url);
        return;
      }

      if (result.reference) {
        const flow = isUpgrade ? "paystack" : "redeem";
        router.push(`/payment/success?reference=${encodeURIComponent(result.reference)}&flow=${flow}`);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return;
      setError(err instanceof ApiError ? err.message : "Unable to start payment. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loadingUser) {
    return (
      <main className="cart-page">
        <div className="cart-shell">
          <div className="cart-loading">Loading checkout…</div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-shell">
        <header className="cart-header">
          <h1>Your cart</h1>
          <span>Review your plan and choose your billing duration.</span>
        </header>

        {error && <div className="cart-error" role="alert">{error}</div>}

        <div className="cart-grid">
          <section className="cart-card">
            <div className="cart-card-heading">
              <div>
                <h2>{plan.name}</h2>
                <p className="cart-plan-label">EchoStream Plan</p>
              </div>
              <Image src="/logo.svg" alt="EchoStream" width={48} height={48} />
            </div>

            <div className="duration-section">
              <div className="duration-title">
                <span>Duration / Period</span>
                <div className="duration-price-info">
                  {duration === "year" && <small>Save {money(annualSavings)}</small>}
                  <strong>{money(listPrice)}</strong>
                </div>
              </div>
              <div className="duration-select-wrap">
                <IonIcon className="duration-select-check" icon={checkmark} aria-hidden="true" />
                <select
                  className="duration-select"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value as Duration)}
                  aria-label="Choose subscription duration"
                >
                  <option value="month">1 Month — {money(plan.monthly)}</option>
                  <option value="year">12 Months — {money(plan.yearly)}</option>
                </select>
              </div>
            </div>

            <div className="duration-deal-divider" />
            {duration === "month" && (
              <div className="duration-deal">
                <p>
                  Switch to annual billing for the <strong>biggest savings</strong>.
                </p>
                <button type="button" className="duration-deal-button" onClick={() => setDuration("year")}>
                  Get deal
                </button>
              </div>
            )}

            {isUpgrade && (
              <div className="cart-credit-box">
                {loadingQuote
                  ? "Calculating your upgrade…"
                  : <>Current subscription credit: <strong>{money(quote?.unused_value ?? 0)}</strong></>}
              </div>
            )}

            {isNewSubscription && voucherQuote && (
              <div className="cart-credit-box">
                Account credit available: <strong>{money(voucherQuote.credit_available)}</strong>
                {voucherQuote.credit_applied > 0 && <> · Applied: <strong>{money(voucherQuote.credit_applied)}</strong></>}
              </div>
            )}

            <p className="billing-copy">
              {duration === "year"
                ? `Billed every 12 months at ${money(listPrice)}. Equivalent to ${money(monthlyEquivalent)} per month.`
                : `Billed every month at ${money(listPrice)}.`}
            </p>
          </section>

          <aside className="summary-card">
            <h2>Order summary</h2>
            <div className="summary-row">
              <span>{plan.name} Plan</span>
              <strong>{money(listPrice)}</strong>
            </div>
            <div className="summary-row">
              <span>{duration === "month" ? "1 month" : "12 months"}</span>
              <span>{duration === "year" ? "Annual" : "Monthly"}</span>
            </div>
            <div className="summary-divider" />

            {isUpgrade && (
              <>
                <div className="summary-row savings">
                  <span>Unused subscription credit</span>
                  <strong>−{money(quote?.unused_value ?? 0)}</strong>
                </div>
                {(quote?.account_credit_applied ?? 0) > 0 && (
                  <div className="summary-row savings">
                    <span>Account credit</span>
                    <strong>−{money(quote?.account_credit_applied ?? 0)}</strong>
                  </div>
                )}
                {(quote?.voucher_credit_applied ?? 0) > 0 && (
                  <div className="summary-row savings">
                    <span>Voucher credit</span>
                    <strong>−{money(quote?.voucher_credit_applied ?? 0)}</strong>
                  </div>
                )}
              </>
            )}

            {!isUpgrade && (voucherQuote?.credit_applied ?? 0) > 0 && (
              <div className="summary-row savings">
                <span>Account credit</span>
                <strong>−{money(voucherQuote?.credit_applied ?? 0)}</strong>
              </div>
            )}

            {!isUpgrade && duration === "year" && (
              <div className="summary-row savings">
                <span>Annual savings</span>
                <strong>−{money(annualSavings)}</strong>
              </div>
            )}

            <div className="summary-total">
              <span>{isUpgrade ? "Pay now" : "Total"}</span>
              <strong>{loadingQuote ? "…" : money(checkoutTotal)}</strong>
            </div>

            <button
              type="button"
              className="coupon-link"
              onClick={() => setCouponOpen((open) => !open)}
              aria-expanded={couponOpen}
            >
              Use voucher / redeem code
            </button>

            {couponOpen && (
              <div className="coupon-input-wrap">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setVoucher(null);
                    setError("");
                  }}
                  placeholder="Enter voucher or redeem code"
                  aria-label="Voucher or redeem code"
                  autoFocus
                />
                <button type="button" onClick={applyVoucher} disabled={validatingVoucher}>
                  {validatingVoucher ? "Checking…" : "Apply"}
                </button>
              </div>
            )}

            {voucher && (
              <p className="billing-copy">
                {voucher.type === "voucher"
                  ? `Voucher applied: ${money(voucher.credit)} credit.`
                  : `${voucher.plan ? voucher.plan[0].toUpperCase() + voucher.plan.slice(1) : "Subscription"} subscription code: ${voucher.duration_days} days.`}
              </p>
            )}

            {user && isRecurringSubscription && (
              <div className="payment-method-row">
                <IonIcon icon={cardOutline} aria-hidden="true" />
                <span>{hasCard ? `${paymentName} •••• ${paymentDetails?.last4}` : "Saved payment method"}</span>
              </div>
            )}

            <button
              type="button"
              className="checkout-button"
              onClick={checkout}
              disabled={Boolean(
                checkoutLoading ||
                loadingQuote ||
                (user && isUpgrade && !quote) ||
                (user && !isUpgrade && !voucherQuote)
              )}
            >
              {checkoutLoading
                ? "Processing…"
                : !user
                  ? "Continue to login"
                  : isUpgrade
                    ? checkoutTotal > 0
                      ? "Continue to payment"
                      : "Apply upgrade"
                    : voucher?.type === "subscription"
                      ? "Redeem subscription"
                      : checkoutTotal > 0
                        ? "Continue to checkout"
                        : "Use credit & subscribe"}
            </button>

            <p className="text-xs pt-2.5 text-gray-500 flex items-center justify-center gap-1">
  Secure checkout powered by <span className="font-semibold ">Paystack</span>
</p>

          </aside>
        </div>
      </div>
    </main>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={
      <main className="cart-page">
        <div className="cart-shell">
          <div className="cart-loading">Loading checkout…</div>
        </div>
      </main>
    }>
      <CartPageContent />
    </Suspense>
  );
}