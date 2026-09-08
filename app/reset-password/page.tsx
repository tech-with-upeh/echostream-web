"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api";
import "../login/login.css";

function decodeEmail(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.sub === "string" ? payload.sub : "";
  } catch { return ""; }
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("token") || "";
    setToken(value);
    setEmail(decodeEmail(value));
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault(); setError(""); setSuccess("");
    if (!token || !email) return setError("This password reset link is invalid or incomplete.");
    if (password.length < 8) return setError("Your new password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    setLoading(true);
    try {
      const result = await apiFetch<{ message: string }>("/reset-password", { method: "POST", body: JSON.stringify({ email, token, password }) });
      setSuccess("Your password has been changed successfully. Redirecting to login...");
      setTimeout(() => router.replace("/login"), 1200);
    } catch (err) { setError(err instanceof ApiError ? err.message : "Unable to reset your password."); }
    finally { setLoading(false); }
  }

  return <main className="login-page"><div className="login-card">
    <a href="/" className="login-logo" aria-label="EchoStream home"><img src="/logo.svg" alt="EchoStream" /></a>
    <div className="login-heading"><h1>Reset your password</h1><p>Choose a new password for your EchoStream account.</p></div>
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {error && <div role="alert" className="border border-red-500/20 bg-red-500/[0.04] px-4 py-3 text-sm text-red-300">{error}</div>}
      {success && <div role="status" className="border border-[#6ee7e5]/20 bg-[#6ee7e5]/[0.04] px-4 py-3 text-sm text-[#6ee7e5]">{success}</div>}
      <label><span>Email</span><input type="email" value={email} readOnly /></label>
      <label><span>New password</span><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" disabled={loading} /></label>
      <label><span>Confirm new password</span><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat your new password" autoComplete="new-password" disabled={loading} /></label>
      <button type="submit" className="login-submit" disabled={loading}>{loading ? "Resetting..." : "Reset password"}</button>
    </form>
  </div></main>;
}
