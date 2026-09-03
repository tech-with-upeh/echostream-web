"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { checkmarkCircle, logoApple, logoGoogle, warning } from "ionicons/icons";
import { ApiError, login } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const tokens = await login(email, password);

      localStorage.setItem("echostream_access_token", tokens.access_token);
      localStorage.setItem("echostream_refresh_token", tokens.refresh_token);
      localStorage.setItem("echostream_token_type", tokens.token_type);

      setSuccess("Login successful.");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <Link href="/" className="login-logo" aria-label="EchoStream home">
          <img src="/logo.svg" alt="EchoStream" />
        </Link>

        <div className="login-heading">
          <h1>Welcome back</h1>
          <p>Log in to manage your EchoStream account.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div
              className="flex items-start gap-3 border border-[#e5f54a]/20 bg-[#e5f54a]/[0.045] px-4 py-3.5 text-left"
              role="alert"
            >
              <IonIcon
                icon={warning}
                className="mt-0.5 h-5 w-5 shrink-0 text-[#e5f54a]"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-[#f4f7f7]">Unable to sign in</p>
                <p className="mt-0.5 text-xs leading-5 text-[#a7b0b2]">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div
              className="flex items-start gap-3 border border-[#6ee7e5]/20 bg-[#6ee7e5]/[0.04] px-4 py-3.5 text-left"
              role="status"
            >
              <IonIcon
                icon={checkmarkCircle}
                className="mt-0.5 h-5 w-5 shrink-0 text-[#6ee7e5]"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-[#f4f7f7]">Login successful</p>
                <p className="mt-0.5 text-xs leading-5 text-[#a7b0b2]">{success}</p>
              </div>
            </div>
          )}

          <label htmlFor="email">
            <span>Email</span>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={loading}
            />
          </label>

          <label htmlFor="password">
            <span>Password</span>
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
            />
          </label>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-divider" aria-hidden="true">
          <span>or</span>
        </div>

        <div className="login-socials">
          <button type="button" className="login-social">
            <IonIcon icon={logoGoogle} aria-hidden="true" />
            <span>Continue with Google</span>
          </button>
          <button type="button" className="login-social">
            <IonIcon icon={logoApple} aria-hidden="true" />
            <span>Continue with Apple</span>
          </button>
        </div>

        <p className="login-signup">
          Don&apos;t have an account? <Link href="/getmobile">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
