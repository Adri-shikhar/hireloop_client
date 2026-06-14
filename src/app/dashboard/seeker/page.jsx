import Link from "next/link";
import { Briefcase, Bookmark, FileText } from "lucide-react";
import RecruiterPageHeader from "@/components/recruiter/shared/RecruiterPageHeader";
import { getUserSession } from "@/lib/core/session";
import { getApplicationsByApplicant } from "@/lib/api/applications";

export default async function SeekerDashboardPage() {
  const user = await getUserSession();
  const applications = user?.id ? await getApplicationsByApplicant(user.id) : [];

  const stats = [
    { label: "Applications", value: applications.length, href: "/dashboard/seeker/applications" },
    { label: "Saved Jobs", value: 0, href: "/dashboard/seeker/saved-jobs" },
    { label: "Browse Jobs", value: "→", href: "/dashboard/seeker/jobs" },
  ];

  return (
    <>
      <RecruiterPageHeader
        title="Seeker Dashboard"
        description="Track your applications and discover your next opportunity."
      />

      <div className="rd-jobs-panel">
        <div className="rd-jobs-panel-header">
          <h2>Overview</h2>
        </div>
        <div className="rd-panel-body" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, padding: 20 }}>
          {stats.map(({ label, value, href }) => (
            <Link
              key={label}
              href={href}
              className="dash-panel"
              style={{ padding: 20, textDecoration: "none" }}
            >
              <p className="text-zinc-500 text-xs uppercase tracking-wide mb-2">{label}</p>
              <p className="text-2xl font-semibold text-white">{value}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rd-jobs-panel" style={{ marginTop: 24 }}>
        <div className="rd-jobs-panel-header">
          <h2>Quick Actions</h2>
        </div>
        <div className="rd-panel-body" style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: 20 }}>
          <Link href="/jobs" className="btn-dash-secondary">
            <Briefcase size={16} /> Browse all jobs
          </Link>
          <Link href="/dashboard/seeker/applications" className="btn-dash-secondary">
            <FileText size={16} /> My applications
          </Link>
          <Link href="/dashboard/seeker/saved-jobs" className="btn-dash-secondary">
            <Bookmark size={16} /> Saved jobs
          </Link>
        </div>
      </div>
    </>
  );
}
