"use client";

import { Briefcase } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import DashboardEmptyState from "@/components/recruiter/DashboardEmptyState";

export default function JobsPage() {
  return (
    <div>
      <PageHeader
        variant="recruiter"
        title="Manage Jobs"
        description="View, edit, and track performance of your job listings."
      />

      <DashboardEmptyState
        icon={Briefcase}
        title="No job listings yet"
        description="Post your first job to start receiving applications and building your talent pipeline."
        action={
          <Link href="/dashboard/recruiter/jobs/new" className="rd-btn-empty">
            Post your first job
          </Link>
        }
      />
    </div>
  );
}
