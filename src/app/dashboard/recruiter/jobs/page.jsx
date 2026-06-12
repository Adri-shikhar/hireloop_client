import Link from "next/link";
import { Briefcase, Plus } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import DashboardEmptyState from "@/components/recruiter/DashboardEmptyState";
import { getJobs } from "@/lib/actions/job";

export default async function JobsPage() {
  const data = await getJobs();
  const jobs = Array.isArray(data) ? data : [];
  const hasJobs = jobs.length > 0;

  return (
    <div>
      <PageHeader
        variant={!hasJobs ? "recruiter" : undefined}
        title="Manage Jobs"
        description="Create and manage your job listings to attract top talent."
        action={hasJobs && (
          <Link href="/dashboard/recruiter/jobs/new" className="btn-dash-primary">
            <Plus size={16} /> Post a job
          </Link>
        )}
      />

      {!hasJobs ? (
        <DashboardEmptyState
          icon={Briefcase}
          title="No jobs posted yet"
          description="Create your first job listing to start building your talent pipeline on HireLoop."
          action={
            <Link href="/dashboard/recruiter/jobs/new" className="rd-btn-empty">
              Post a job
            </Link>
          }
        />
      ) : (
        <div className="rd-jobs-panel">
          <div className="rd-jobs-panel-header">
            <h2>Your Job Listings</h2>
            <span>{jobs.length} job{jobs.length !== 1 && "s"}</span>
          </div>
          <div className="jobs-table-wrap">
            <table className="jobs-table">
              <thead>
                <tr>
                  {["Job", "Type", "Salary", "Location", "Deadline", "Status"].map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => {
                  const status = ["draft", "closed"].includes(job.status) ? job.status : "active";
                  return (
                    <tr key={`${String(job._id)}-${job.jobTitle}`}>
                      <td>
                        <div className="rd-job-cell-title">
                          <span>{job.jobTitle}</span>
                          <span>{job.jobCategory}</span>
                        </div>
                      </td>
                      <td className="text-gray-400">{job.jobType || "—"}</td>
                      <td className="text-gray-400">
                        {job.minSalary ? `$${job.minSalary} - $${job.maxSalary}` : "—"}
                      </td>
                      <td className="text-gray-400">{job.isRemote ? "Remote" : job.location || "—"}</td>
                      <td className="text-gray-500 text-sm">{job.deadline ? String(job.deadline) : "—"}</td>
                      <td>
                        <span className={`status-badge ${status}`}>{job.status || "active"}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}