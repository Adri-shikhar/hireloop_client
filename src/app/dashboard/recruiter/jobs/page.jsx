"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import DashboardEmptyState from "@/components/recruiter/DashboardEmptyState";
import { getMyJobs } from "@/lib/actions/job";
import { UserInformation } from "@/components/users/user";

function JobRow({ job }) {
  const status = ["draft", "closed"].includes(job.status) ? job.status : "active";
  const salary = job.minSalary ? `$${job.minSalary} - $${job.maxSalary}` : "—";
  const location = job.isRemote ? "Remote" : job.location || "—";

  return (
    <tr>
      <td>
        <div className="rd-job-cell-title">
          <span>{job.jobTitle}</span>
          <span>{job.jobCategory}</span>
        </div>
      </td>
      <td className="text-gray-400">{job.jobType || "—"}</td>
      <td className="text-gray-400">{salary}</td>
      <td className="text-gray-400">{location}</td>
      <td className="text-gray-500 text-sm">{job.deadline ? String(job.deadline) : "—"}</td>
      <td>
        <span className={`status-badge ${status}`}>{job.status || "active"}</span>
      </td>
      <td>
        <div className="flex items-center justify-end gap-3">
          <Link href={`/dashboard/recruiter/jobs/${job._id}`} className="text-gray-500 hover:text-white transition-colors" title="View Job">
            <Eye size={16} />
          </Link>
          <Link href={`/dashboard/recruiter/jobs/${job._id}/edit`} className="text-gray-500 hover:text-white transition-colors" title="Edit Job">
            <Pencil size={16} />
          </Link>
          <button type="button" className="text-gray-500 hover:text-red-500 transition-colors" title="Delete Job">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function JobsPage() {
  const user = UserInformation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.isLoading) return;

    async function loadJobs() {
      if (!user.user?.id) {
        setJobs([]);
        setLoading(false);
        return;
      }

      const data = await getMyJobs(user.user.id);
      setJobs(data);
      setLoading(false);
    }

    loadJobs();
  }, [user.user?.id, user.isLoading]);

  if (loading || user.isLoading) {
    return (
      <div>
        <PageHeader variant="recruiter" title="Manage Jobs" description="Loading your job listings..." />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div>
        <PageHeader variant="recruiter" title="Manage Jobs" description="Create and manage your job listings to attract top talent." />
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
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Manage Jobs"
        description="Create and manage your job listings to attract top talent."
        action={
          <Link href="/dashboard/recruiter/jobs/new" className="btn-dash-primary">
            <Plus size={16} /> Post a job
          </Link>
        }
      />

      <div className="rd-jobs-panel">
        <div className="rd-jobs-panel-header">
          <h2>Your Job Listings</h2>
          <span>{jobs.length} jobs</span>
        </div>
        <div className="jobs-table-wrap">
          <table className="jobs-table">
            <thead>
              <tr>
                {["Job", "Type", "Salary", "Location", "Deadline", "Status", ""].map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <JobRow key={String(job._id)} job={job} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
