"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { checkmarkCircle, lockClosed, logoApple, logoGoogle, mail, shieldCheck, warning } from "ionicons/icons";
import { ApiError, apiFetch, login } from "@/lib/api";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setVerificationRequired(false);
    setResendMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      setError("Enter a valid email address, such as you@example.com.");
      return;
    }

    if (!password) {
      setError("Enter your password to continue.");
      return;
    }

    setLoading(true);

    try {
      const tokens = await login(normalizedEmail, password);

      sessionStorage.setItem("echostream_access_token", tokens.access_token);
      sessionStorage.setItem("echostream_refresh_token", tokens.refresh_token);
      sessionStorage.setItem("echostream_token_type", tokens.token_type);

      setSuccess("You're signed in. Welcome back to EchoStream.");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 403) {
          setVerificationRequired(true);
          setError("Your email address still needs to be verified before you can sign in.");
        } else if (err.status === 401) {
          setError("The email or password is incorrect. Please check your details and try again.");
        } else {
          setError(err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResendVerification() {
    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      setResendMessage("Enter the email address you used to create your account.");
      return;
    }

    setResending(true);
    setResendMessage("");

    try {
      const response = await apiFetch<{ status: string; message: string }>(
        "/resend-verification",
        {
          method: "POST",
          body: JSON.stringify({ email: normalizedEmail }),
        },
      );
      setResendMessage(response.message);
    } catch (err) {
      setResendMessage(
        err instanceof Error
          ? err.message
          : "We couldn't resend the verification email. Please try again.",
      );
    } finally {
      setResending(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0f11] text-[#f4f7f7]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-48 top-1/3 h-[420px] w-[420px] rounded-full bg-[#e5f54a]/5 blur-[120px]" />
        <div className="absolute -right-48 top-0 h-[460px] w-[460px] rounded-full bg-[#6ee7e5]/5 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(110,231,229,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,229,0.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-[min(1180px,calc(100%-32px))] items-center justify-center py-10 sm:w-[min(1180px,calc(100%-48px))] sm:py-14">
        <div className="grid w-full max-w-[1080px] overflow-hidden border border-white/10 bg-[#0b0f11]/80 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:grid-cols-[0.88fr_1.12fr]">
          <section className="relative hidden overflow-hidden border-r border-white/10 p-10 lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full border border-[#e5f54a]/10" />
            <div className="absolute -right-28 top-20 h-72 w-72 rounded-full border border-[#6ee7e5]/10" />

            <div className="relative">
              <Link href="/" className="inline-flex items-center gap-3" aria-label="EchoStream home">
                <img src="/logo.svg" alt="EchoStream" className="h-9 w-9 object-contain" />
                <span className="text-xl font-bold tracking-[-0.7px]">EchoStream</span>
              </Link>

              <div className="mt-24 max-w-sm">
                <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6ee7e5]">
                  <span className="h-px w-8 bg-[#6ee7e5]/50" />
                  Creator control
                </p>
                <h2 className="text-5xl font-medium leading-[0.92] tracking-[-3px] xl:text-6xl">
                  Your stream.<br />
                  <span className="text-[#e5f54a]">Your sound.</span>
                </h2>
                <p className="mt-7 text-sm leading-7 text-[#a7b0b2]">
                  Sign in to control your live alerts, voices, sounds, and stream preferences from one place.
                </p>
              </div>
            </div>

            <div className="relative flex items-center gap-3 text-xs text-[#a7b0b2]">
              <IonIcon icon={shieldCheck} className="h-4 w-4 text-[#6ee7e5]" aria-hidden="true" />
              <span>Email verification helps keep your account secure.</span>
            </div>
          </section>

          <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
            <div className="w-full max-w-[430px]">
              <div className="mb-9 lg:hidden">
                <Link href="/" className="inline-flex items-center gap-3" aria-label="EchoStream home">
                  <img src="/logo.svg" alt="EchoStream" className="h-9 w-9 object-contain" />
                  <span className="text-xl font-bold tracking-[-0.7px]">EchoStream</span>
                </Link>
              </div>

              <div className="mb-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#6ee7e5]">Welcome back</p>
                <h1 className="text-4xl font-medium tracking-[-2px] sm:text-5xl">Sign in</h1>
                <p className="mt-3 text-sm leading-6 text-[#a7b0b2]">
                  Enter your details to continue to your EchoStream account.
                </p>
              </div>

              {error && (
                <div className="mb-5 flex gap-3 border border-[#e5f54a]/20 bg-[#e5f54a]/[0.045] p-4 text-sm leading-6 text-[#d9dfdf]" role="alert">
                  <IonIcon icon={warning} className="mt-0.5 h-5 w-5 shrink-0 text-[#e5f54a]" aria-hidden="true" />
                  <div>{error}</div>
                </div>
              )}

              {verificationRequired && (
                <div className="mb-5 border border-[#6ee7e5]/20 bg-[#6ee7e5]/[0.035] p-4">
                  <div className="flex gap-3">
                    <IonIcon icon={mail} className="mt-0.5 h-5 w-5 shrink-0 text-[#6ee7e5]" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-[#f4f7f7]">Verify your email</p>
                      <p className="mt-1 text-xs leading-5 text-[#a7b0b2]">
                        Check your inbox for the verification link or code sent when you created your account.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resending}
                    className="mt-4 text-xs font-semibold text-[#6ee7e5] transition-colors hover:text-[#e5f54a] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {resending ? "Sending..." : "Resend verification email →"}
                  </button>
                  {resendMessage && <p className="mt-2 text-xs leading-5 text-[#a7b0b2]">{resendMessage}</p>}
                </div>
              )}

              {success && (
                <div className="mb-5 flex gap-3 border border-[#6ee7e5]/20 bg-[#6ee7e5]/[0.04] p-4 text-sm leading-6 text-[#d9dfdf]" role="status">
                  <IonIcon icon={checkmarkCircle} className="mt-0.5 h-5 w-5 shrink-0 text-[#6ee7e5]" aria-hidden="true" />
                  <div>{success}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <label htmlFor="email" className="block">
                  <span className="mb-2 block text-sm font-medium text-[#f4f7f7]">Email address</span>
                  <div className="relative">
                    <IonIcon icon={mail} className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a7b0b2]" aria-hidden="true" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      disabled={loading}
                      className="h-12 w-full border border-white/10 bg-white/[0.035] pl-11 pr-4 text-sm text-[#f4f7f7] outline-none transition placeholder:text-[#a7b0b2]/50 focus:border-[#6ee7e5]/50 focus:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </label>

                <label htmlFor="password" className="block">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-[#f4f7f7]">Password</span>
                  </div>
                  <div className="relative">
                    <IonIcon icon={lockClosed} className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a7b0b2]" aria-hidden="true" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      disabled={loading}
                      className="h-12 w-full border border-white/10 bg-white/[0.035] pl-11 pr-4 text-sm text-[#f4f7f7] outline-none transition placeholder:text-[#a7b0b2]/50 focus:border-[#6ee7e5]/50 focus:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 bg-[#e5f54a] px-5 text-sm font-bold text-[#1a2112] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{loading ? "Signing in..." : "Sign in"}</span>
                  {!loading && <span className="transition-transform group-hover:translate-x-1">→</span>}
                </button>
              </form>

              <div className="my-7 flex items-center gap-4 text-xs text-[#a7b0b2]">
                <span className="h-px flex-1 bg-white/10" />
                <span>or continue with</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex h-11 items-center justify-center gap-2 border border-white/10 bg-white/[0.025] text-sm text-[#d9dfdf] transition hover:border-white/20 hover:bg-white/[0.05]">
                  <IonIcon icon={logoGoogle} className="h-4 w-4" aria-hidden="true" />
                  Google
                </button>
                <button type="button" className="flex h-11 items-center justify-center gap-2 border border-white/10 bg-white/[0.025] text-sm text-[#d9dfdf] transition hover:border-white/20 hover:bg-white/[0.05]">
                  <IonIcon icon={logoApple} className="h-4 w-4" aria-hidden="true" />
                  Apple
                </button>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#a7b0b2]">
                <span>New to EchoStream?</span>
                <Link href="/getmobile" className="font-semibold text-[#6ee7e5] transition-colors hover:text-[#e5f54a]">
                  Create an account →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
