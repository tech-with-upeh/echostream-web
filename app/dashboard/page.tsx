import DashboardNavbar from "@/components/DashboardNavbar";
import { cardOutline, createOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import "./dashboard.css";

export default function DashboardPage() {
  return (
    <main className="dashboard-page">
      <DashboardNavbar />
      <section className="dashboard-content" aria-label="Dashboard">
        <div className="dashboard-overview">
          <div className="dashboard-plan-card">
            <span className="dashboard-plan-badge">Your plan</span>

            <div className="dashboard-plan-heading">
              <img src="/logo.svg" alt="" aria-hidden="true" />
              <h1>Essential</h1>
            </div>

            <p className="dashboard-billing-copy">
              Your next bill is for <strong>₦1,600.00</strong> on <strong>04/09/2026.</strong>
            </p>

            <p className="dashboard-card-details">Mastercard *** 3456 <span>|</span> 07/28</p>
          </div>

          <div className="dashboard-actions">
            <button type="button" className="dashboard-action-card">
              <IonIcon icon={createOutline} aria-hidden="true" />
              <span>Edit Personal Info</span>
            </button>
            <button type="button" className="dashboard-action-card">
              <IonIcon icon={cardOutline} aria-hidden="true" />
              <span>Update card</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
