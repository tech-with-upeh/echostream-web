"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api";

export default function VerifyEmailComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token") || "";

    if (!token) {
      setError("This email verification link is invalid or incomplete.");
      setLoading(false);
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  async function verifyEmail(token: string) {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await apiFetch<{
        status: string;
        message: string;
        access_token?: string;
        refresh_token?: string;
      }>(
        `/verify-email?token=${encodeURIComponent(token)}`,
        {
          method: "GET",
        }
      );

      if (response.status !== "success") {
        setError(response.message || "Unable to verify your email.");
        return;
      }

      // Store the newly issued session tokens.
      if (response.access_token) {
        sessionStorage.setItem("access_token", response.access_token);
      }

      if (response.refresh_token) {
        sessionStorage.setItem("refresh_token", response.refresh_token);
      }

      setSuccess(
        "Your email has been verified successfully. Redirecting..."
      );

      setTimeout(() => {
        router.replace("/dashboard");
      }, 1200);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to verify your email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <a
          href="/"
          className="login-logo"
          aria-label="EchoStream home"
        >
          <img src="/logo.svg" alt="EchoStream" />
        </a>

        <div className="login-heading">
          <h1>Verify your email</h1>

          <p>
            {loading
              ? "We're verifying your email address..."
              : success
                ? "Your email address has been verified."
                : "We couldn't verify your email address."}
          </p>
        </div>

        {loading && (
          <div
            role="status"
            className="border border-[#6ee7e5]/20 bg-[#6ee7e5]/4 px-4 py-3 text-sm text-[#6ee7e5]"
          >
            Verifying your email...
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="border border-red-500/20 bg-red-500/4 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="border border-[#6ee7e5]/20 bg-[#6ee7e5]/4 px-4 py-3 text-sm text-[#6ee7e5]"
          >
            {success}
          </div>
        )}

        {!loading && error && (
          <button
            type="button"
            className="login-submit"
            onClick={() => router.replace("/login")}
          >
            Go to login
          </button>
        )}
      </div>
    </main>
  );
}
