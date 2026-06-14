"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import SeekerSidebar from "./SeekerSidebar";
import "./tokens.css";
import "./shell.css";

export default function SeekerDashboardShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="rd-shell">
      <div
        className={`rd-sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <div className={`rd-sidebar-wrap ${sidebarOpen ? "open" : ""}`}>
        <SeekerSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      <div className="rd-main">
        <header className="rd-topbar">
          <button
            type="button"
            className="rd-menu-btn"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-expanded={sidebarOpen}
            aria-controls="seeker-dashboard-sidebar"
            aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span className="text-sm font-semibold text-zinc-400">HireLoop Seeker</span>
        </header>

        <main id="main-content" className="rd-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
