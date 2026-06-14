import Link from "next/link";
import RecruiterPageHeader from "@/components/recruiter/shared/RecruiterPageHeader";
import DashboardEmptyState from "@/components/recruiter/shared/DashboardEmptyState";
import JobCard from "@/components/jobs/JobCard";
import { Briefcase } from "lucide-react";
import { getJobs } from "@/lib/api/jobs";

export default async function SeekerJobsPage() {
  const jobs = await getJobs();

  return (
    <>
      <RecruiterPageHeader
        title="Find Jobs"
        description={`Browse ${jobs.length} open role${jobs.length === 1 ? "" : "s"} and apply from the job details page.`}
        action={
          <Link href="/jobs" className="btn-dash-primary">
            Public jobs page
          </Link>
        }
      />

      {jobs.length === 0 ? (
        <DashboardEmptyState
          icon={Briefcase}
          title="No jobs available"
          description="Check back soon for new openings on HireLoop."
        />
      ) : (
        <div className="jobs-list">
          {jobs.map((job) => (
            <JobCard key={String(job._id)} job={job} />
          ))}
        </div>
      )}
    </>
  );
}
