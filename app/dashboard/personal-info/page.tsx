"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, logOutOutline, mailOutline } from "ionicons/icons";
import { ApiError, clearSessionData, forgotPassword, getCurrentUser, resetPasswordWithCode, resetPassword, CurrentUser } from "@/lib/api";
import "./personal-info.css";

export default function PersonalInfoPage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => router.replace("/login")).finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");
    if (token && email) {
      setCode(token);
      setMessage("Enter your new password below.");
    }
  }, []);

  async function sendResetEmail() {
    if (!user) return;
    setError(""); setMessage(""); setSending(true);
    try {
      await forgotPassword(user.email);
      setMessage("Password reset instructions have been sent to your email.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to send the reset email.");
    } finally { setSending(false); }
  }

  async function handleCodeReset(event: FormEvent) {
    event.preventDefault(); setError(""); setMessage("");
    if (!user) return;
    if (!code.trim()) return setError("Enter the reset code from your email.");
    if (password.length < 8) return setError("Your new password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    setResetting(true);
    try {
      const result = await resetPasswordWithCode(user.email, code.trim(), password);
      if (result.access_token) {
        localStorage.setItem("echostream_access_token", result.access_token);
        if (result.refresh_token) localStorage.setItem("echostream_refresh_token", result.refresh_token);
        localStorage.setItem("echostream_token_type", result.token_type || "bearer");
      }
      setPassword(""); setConfirmPassword(""); setCode("");
      setMessage("Your password has been changed successfully.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to change your password.");
    } finally { setResetting(false); }
  }

  async function handleLogout() {
    const accessToken = localStorage.getItem("echostream_access_token");
    try {
      if (accessToken) {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "")}/logout`, { method: "POST", headers: { Authorization: `Bearer ${accessToken}` } });
      }
    } catch {}
    localStorage.removeItem("echostream_access_token");
    localStorage.removeItem("echostream_refresh_token");
    localStorage.removeItem("echostream_token_type");
    clearSessionData();
    router.replace("/login");
  }

  if (loading) return <main className="personal-info-page"><div className="personal-info-card">Loading...</div></main>;
  if (!user) return null;

  return (
    <main className="personal-info-page">
      <div className="personal-info-card">
        <button type="button" className="personal-info-back" onClick={() => router.push("/dashboard")}><IonIcon icon={arrowBackOutline} /> Back to dashboard</button>
        <div className="personal-info-heading"><h1>Personal Info</h1><p>Manage your account password and email details.</p></div>
        <div className="personal-info-email"><IonIcon icon={mailOutline} /><div><span>Email</span><strong>{user.email}</strong></div></div>

        <section className="password-section">
          <div><h2>Change password</h2><p>We&apos;ll send a reset code to your email. You can use that code here or the reset link in the email.</p></div>
          <button type="button" className="personal-info-primary" onClick={sendResetEmail} disabled={sending}>{sending ? "Sending..." : "Send reset email"}</button>
        </section>

        <form className="password-form" onSubmit={handleCodeReset}>
          <label><span>Reset code</span><input value={code} onChange={e => setCode(e.target.value)} placeholder="6-digit code" autoComplete="one-time-code" /></label>
          <label><span>New password</span><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" /></label>
          <label><span>Confirm new password</span><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat your new password" autoComplete="new-password" /></label>
          {error && <p className="personal-info-error" role="alert">{error}</p>}
          {message && <p className="personal-info-success" role="status">{message}</p>}
          <button type="submit" className="personal-info-primary" disabled={resetting}>{resetting ? "Changing password..." : "Change password"}</button>
        </form>

        <div className="personal-info-logout"><button type="button" onClick={handleLogout}><IonIcon icon={logOutOutline} /> Log out</button></div>
      </div>
    </main>
  );
}
