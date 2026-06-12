"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    applications: true,
    jobViews: true,
    weeklyDigest: false,
  });

  const toggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account preferences and notification settings."
      />

      <div className="dash-panel" style={{ maxWidth: 640 }}>
        <div className="dash-panel-header">
          <h2>Notifications</h2>
        </div>
        <div className="dash-panel-body">
          <div className="settings-section">
            <div className="settings-row">
              <div>
                <h3>New applications</h3>
                <p>Get notified when someone applies to your jobs</p>
              </div>
              <button
                type="button"
                onClick={() => toggle("applications")}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  notifications.applications ? "bg-indigo-500" : "bg-zinc-700"
                }`}
                aria-pressed={notifications.applications}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    notifications.applications ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="settings-row">
              <div>
                <h3>Job view milestones</h3>
                <p>Alerts when your listings reach view milestones</p>
              </div>
              <button
                type="button"
                onClick={() => toggle("jobViews")}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  notifications.jobViews ? "bg-indigo-500" : "bg-zinc-700"
                }`}
                aria-pressed={notifications.jobViews}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    notifications.jobViews ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="settings-row">
              <div>
                <h3>Weekly digest</h3>
                <p>Summary of hiring activity every Monday</p>
              </div>
              <button
                type="button"
                onClick={() => toggle("weeklyDigest")}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  notifications.weeklyDigest ? "bg-indigo-500" : "bg-zinc-700"
                }`}
                aria-pressed={notifications.weeklyDigest}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    notifications.weeklyDigest ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-panel mt-4" style={{ maxWidth: 640 }}>
        <div className="dash-panel-header">
          <h2>Account</h2>
        </div>
        <div className="dash-panel-body">
          <div className="settings-row">
            <div>
              <h3>Email address</h3>
              <p>Update your login email</p>
            </div>
            <button type="button" className="btn-dash-secondary">
              Change
            </button>
          </div>
          <div className="settings-row">
            <div>
              <h3>Password</h3>
              <p>Change your account password</p>
            </div>
            <button type="button" className="btn-dash-secondary">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
