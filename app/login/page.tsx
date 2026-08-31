"use client";

import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { logoApple, logoGoogle } from "ionicons/icons";

export default function LoginPage() {
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

        <form className="login-form">
          <label htmlFor="email">
            <span>Email</span>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
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
              required
            />
          </label>

          <button type="submit" className="login-submit">
            Login
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
