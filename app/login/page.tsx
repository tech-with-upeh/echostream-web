"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { logoApple, logoGoogle } from "ionicons/icons";
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
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="login-success" role="status">
              {success}
            </p>
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
