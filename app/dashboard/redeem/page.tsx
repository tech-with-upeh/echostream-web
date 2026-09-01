"use client";

import Link from "next/link";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import "../dashboard.css";
import "../dashboard-ui.css";
import "./redeem.css";

export default function RedeemPage() {
  return (
    <main className="redeem-page">
      <section className="redeem-content">
        <Link href="/dashboard" className="redeem-back">
          <IonIcon icon={arrowBackOutline} aria-hidden="true" />
          <span>Back</span>
        </Link>

        <div className="redeem-card">
          <h1>Redeem your code</h1>
          <p className="redeem-description">
            Enter the PIN on the back of your gift card, or enter the premium code from your in-store receipt. <a href="https://www.spotify.com/ng/legal/gift-card/" target="_blank" rel="noreferrer">Terms and conditions apply</a>
          </p>

          <form className="redeem-form">
            <label htmlFor="premium-code">Enter your premium code</label>
            <input id="premium-code" name="premium-code" type="text" placeholder="Enter code" autoComplete="off" />
            <button type="submit">Redeem code</button>
          </form>
        </div>
      </section>
    </main>
  );
}
