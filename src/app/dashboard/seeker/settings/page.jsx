"use client";

import { useState } from "react";
import RecruiterPageHeader from "@/components/recruiter/shared/RecruiterPageHeader";

export default function SeekerSettingsPage() {
  const [notifications, setNotifications] = useState({
    applications: true,
    jobAlerts: true,
    weeklyDigest: false,
  });

  const toggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <RecruiterPageHeader
        title="Settings"
        description="Manage your seeker account preferences."
      />

      <div className="dash-panel" style={{ maxWidth: 640 }}>
        <div className="dash-panel-header">
          <h2>Notifications</h2>
        </div>
        <div className="dash-panel-body">
          <div className="settings-section">
            <div className="settings-row">
              <div>
                <h3>Application updates</h3>
                <p>Get notified when your application status changes</p>
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
                <h3>Job alerts</h3>
                <p>New roles matching your saved preferences</p>
              </div>
              <button
                type="button"
                onClick={() => toggle("jobAlerts")}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  notifications.jobAlerts ? "bg-indigo-500" : "bg-zinc-700"
                }`}
                aria-pressed={notifications.jobAlerts}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    notifications.jobAlerts ? "left-[22px]" : "left-0.5"
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
    </div>
  );
}
