import Link from "next/link";
import RecruiterPageHeader from "@/components/recruiter/shared/RecruiterPageHeader";
import DashboardEmptyState from "@/components/recruiter/shared/DashboardEmptyState";
import { Bookmark } from "lucide-react";

export default function SeekerSavedJobsPage() {
  return (
    <>
      <RecruiterPageHeader
        title="Saved Jobs"
        description="Jobs you bookmark will appear here."
      />
      <DashboardEmptyState
        icon={Bookmark}
        title="No saved jobs yet"
        description="Save jobs while browsing to review them later."
        action={
          <Link href="/jobs" className="rd-btn-empty">
            Browse jobs
          </Link>
        }
      />
    </>
  );
}
