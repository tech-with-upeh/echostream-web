"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { checkmarkCircle, logoApple, logoGoogle, warning } from "ionicons/icons";
import { ApiError, googleLogin, login } from "@/lib/api";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: "standard" | "icon";
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              width?: number | string;
              text?: string;
            },
          ) => void;
        };
      };
    };
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
}

export default function LoginPage() {
  const router = useRouter();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [googleReady, setGoogleReady] = useState(false);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const accessToken = localStorage.getItem("echostream_access_token");

    if (accessToken) {
      router.replace("/dashboard");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  useEffect(() => {
    if (!googleClientId) {
      console.warn("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured.");
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]',
    );

    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleCredential,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      googleButtonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        width: "100%",
        text: "continue_with",
      });

      setGoogleReady(true);
    };

    if (window.google) {
      initializeGoogle();
      return;
    }

    if (!script) {
      script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    script.addEventListener("load", initializeGoogle);
    return () => script?.removeEventListener("load", initializeGoogle);
  }, [googleClientId]);

  async function handleGoogleCredential(response: { credential: string }) {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const tokens = await googleLogin(response.credential);

      localStorage.setItem("echostream_access_token", tokens.access_token);
      localStorage.setItem("echostream_refresh_token", tokens.refresh_token);
      localStorage.setItem("echostream_token_type", tokens.token_type);

      setSuccess("Login successful.");
      router.push("/dashboard");
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("Email is required.");
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setError("Enter a valid email address, such as you@example.com.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const tokens = await login(normalizedEmail, password);

      localStorage.setItem("echostream_access_token", tokens.access_token);
      localStorage.setItem("echostream_refresh_token", tokens.refresh_token);
      localStorage.setItem("echostream_token_type", tokens.token_type);

      setSuccess("Login successful.");
      router.push("/dashboard");
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

  if (checkingAuth) {
    return null;
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
            <div className="flex items-start gap-3 border border-[#e5f54a]/20 bg-[#e5f54a]/[0.045] px-4 py-3.5 text-left" role="alert">
              <IonIcon icon={warning} className="mt-0.5 h-5 w-5 shrink-0 text-[#e5f54a]" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-[#f4f7f7]">Unable to sign in</p>
                <p className="mt-0.5 text-xs leading-5 text-[#a7b0b2]">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-3 border border-[#6ee7e5]/20 bg-[#6ee7e5]/[0.04] px-4 py-3.5 text-left" role="status">
              <IonIcon icon={checkmarkCircle} className="mt-0.5 h-5 w-5 shrink-0 text-[#6ee7e5]" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-[#f4f7f7]">Login successful</p>
                <p className="mt-0.5 text-xs leading-5 text-[#a7b0b2]">{success}</p>
              </div>
            </div>
          )}

          <label htmlFor="email">
            <span>Email</span>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={loading} />
          </label>

          <label htmlFor="password">
            <span>Password</span>
            <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required disabled={loading} />
          </label>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-divider" aria-hidden="true"><span>or</span></div>

        <div className="login-socials">
          <div className="relative overflow-hidden">
            <button type="button" className="login-social" disabled={loading}>
              <IonIcon icon={logoGoogle} aria-hidden="true" /><span>Continue with Google</span>
            </button>
            <div
              ref={googleButtonRef}
              aria-hidden="true"
              className="absolute inset-0 z-10 opacity-0"
            />
          </div>
          <button type="button" className="login-social" disabled={loading}>
            <IonIcon icon={logoApple} aria-hidden="true" /><span>Continue with Apple</span>
          </button>
        </div>

        <p className="login-signup">Don&apos;t have an account? <Link href="/getmobile">Sign up</Link></p>
      </div>
    </main>
  );
}
