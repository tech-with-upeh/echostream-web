"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, logOutOutline, mailOutline } from "ionicons/icons";
import { ApiError, apiFetch, clearSessionData, getCurrentUser, CurrentUser } from "@/lib/api";
import "./personal-info.css";

function decodeEmail(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload.sub === "string" ? payload.sub : "";
  } catch { return ""; }
}

export default function PersonalInfoPage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => router.replace("/login")).finally(() => setLoading(false));
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get("token");
    if (resetToken) { setToken(resetToken); setMessage("Enter your new password below."); }
  }, [router]);

  async function sendResetEmail() {
    if (!user) return;
    setError(""); setMessage(""); setSending(true);
    try {
      await apiFetch<{ status: string; message: string }>("/forgot-password", { method: "POST", body: JSON.stringify({ email: user.email }) });
      setMessage("Password reset instructions have been sent to your email.");
    } catch (err) { setError(err instanceof ApiError ? err.message : "Unable to send the reset email."); }
    finally { setSending(false); }
  }

  async function handleReset(event: FormEvent) {
    event.preventDefault(); setError(""); setMessage("");
    if (!user) return;
    if (!code.trim() && !token) return setError("Enter the reset code from your email or use the reset link.");
    if (password.length < 8) return setError("Your new password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    setResetting(true);
    try {
      const email = token ? decodeEmail(token) || user.email : user.email;
      const path = token ? "/reset-password" : "/reset-pass-code";
      const body = token ? { email, token, password } : { email, token: code.trim(), password };
      const result = await apiFetch<{ status: string; message: string; access_token?: string; refresh_token?: string; token_type?: string }>(path, { method: "POST", body: JSON.stringify(body) });
      if (result.access_token) localStorage.setItem("echostream_access_token", result.access_token);
      if (result.refresh_token) localStorage.setItem("echostream_refresh_token", result.refresh_token);
      if (result.token_type) localStorage.setItem("echostream_token_type", result.token_type);
      setPassword(""); setConfirmPassword(""); setCode(""); setToken("");
      setMessage("Your password has been changed successfully.");
      window.history.replaceState({}, "", "/dashboard/personal-info");
    } catch (err) { setError(err instanceof ApiError ? err.message : "Unable to change your password."); }
    finally { setResetting(false); }
  }

  async function handleLogout() {
    const accessToken = localStorage.getItem("echostream_access_token");
    try { if (accessToken) await apiFetch("/logout", { method: "POST", headers: { Authorization: `Bearer ${accessToken}` } }); } catch {}
    localStorage.removeItem("echostream_access_token"); localStorage.removeItem("echostream_refresh_token"); localStorage.removeItem("echostream_token_type"); clearSessionData(); router.replace("/login");
  }

  if (loading) return <main className="personal-info-page"><div className="personal-info-card">Loading...</div></main>;
  if (!user) return null;

  return <main className="personal-info-page"><div className="personal-info-card">
    <button type="button" className="personal-info-back" onClick={() => router.push("/dashboard")}><IonIcon icon={arrowBackOutline} /> Back to dashboard</button>
    <div className="personal-info-heading"><h1>Personal Info</h1><p>Manage your account password and email details.</p></div>
    <div className="personal-info-email"><IonIcon icon={mailOutline} /><div><span>Email</span><strong>{user.email}</strong></div></div>
    <section className="password-section"><div><h2>Change password</h2><p>We&apos;ll send a reset code to your email. You can use the code or the reset link.</p></div><button type="button" className="personal-info-primary" onClick={sendResetEmail} disabled={sending}>{sending ? "Sending..." : "Send reset email"}</button></section>
    <form className="password-form" onSubmit={handleReset}>
      {!token && <label><span>Reset code</span><input value={code} onChange={e => setCode(e.target.value)} placeholder="6-digit code" inputMode="numeric" autoComplete="one-time-code" /></label>}
      <label><span>New password</span><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" /></label>
      <label><span>Confirm new password</span><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat your new password" autoComplete="new-password" /></label>
      {error && <p className="personal-info-error" role="alert">{error}</p>}{message && <p className="personal-info-success" role="status">{message}</p>}
      <button type="submit" className="personal-info-primary" disabled={resetting}>{resetting ? "Changing password..." : "Change password"}</button>
    </form>
    <div className="personal-info-logout"><button type="button" onClick={handleLogout}><IonIcon icon={logOutOutline} /> Log out</button></div>
  </div></main>;
}
