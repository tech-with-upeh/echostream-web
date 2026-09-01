'use client'
import DashboardNavbar from "@/components/DashboardNavbar";
import { cardOutline, createOutline, diamondOutline, chevronForwardOutline, closeOutline, helpCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import "./dashboard.css";
import "./dashboard-ui.css";

const settingGroups = [
  {
    title: "Subscription",
    items: [
      { label: "Available subscription", icon: diamondOutline },
      { label: "Manage Subscription", icon: "/logo.svg" },
      { label: "Cancel Subscription", icon: closeOutline },
    ],
  },
  {
    title: "Payment",
    items: [
      { label: "Payment history", icon: cardOutline },
      { label: "Saved cards", icon: cardOutline },
      { label: "Redeem", icon: diamondOutline },
    ],
  },
  {
    title: "Security and privacy",
    items: [
      { label: "Change password", icon: createOutline },
      { label: "Notification settings", icon: createOutline },
      { label: "Login methods", icon: createOutline },
      { label: "Delete account", icon: closeOutline },
      { label: "Sign out everywhere", icon: closeOutline },
    ],
  },
];

function SettingIcon({ icon }: { icon: string }) {
  if (icon === "/logo.svg") {
    return <img className="dashboard-setting-logo" src={icon} alt="" aria-hidden="true" />;
  }
  return <IonIcon icon={icon} aria-hidden="true" />;
}

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
            <p className="dashboard-billing-copy">Your next bill is for <strong>₦1,600.00</strong> on <strong>04/09/2026.</strong></p>
            <p className="dashboard-card-details">Mastercard *** 3456 <span>|</span> 07/28</p>
          </div>
          <div className="dashboard-actions">
            <button type="button" className="dashboard-action-card"><IonIcon icon={createOutline} aria-hidden="true" /><span>Edit Personal Info</span></button>
            <button type="button" className="dashboard-action-card"><IonIcon icon={cardOutline} aria-hidden="true" /><span>Update card</span></button>
          </div>
        </div>

        {settingGroups.map((group) => (
          <section className="dashboard-section-card" key={group.title}>
            <h2 className="dashboard-section-title">{group.title}</h2>
            <div className="dashboard-setting-list">
              {group.items.map((item) => (
                <button type="button" className="dashboard-setting-row" key={item.label}>
                  <span className="dashboard-setting-label"><SettingIcon icon={item.icon} /><span>{item.label}</span></span>
                  <IonIcon className="dashboard-setting-caret" icon={chevronForwardOutline} aria-hidden="true" />
                </button>
              ))}
            </div>
          </section>
        ))}

        <section className="dashboard-section-card dashboard-help-card">
          <h2 className="dashboard-section-title">Help</h2>
          <button type="button" className="dashboard-setting-row dashboard-help-row">
            <span className="dashboard-setting-label"><IonIcon icon={helpCircleOutline} aria-hidden="true" /><span>Echostream Support</span></span>
            <IonIcon className="dashboard-setting-caret" icon={chevronForwardOutline} aria-hidden="true" />
          </button>
        </section>
      </section>
    </main>
  );
}
