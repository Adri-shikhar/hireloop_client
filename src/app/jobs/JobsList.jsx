"use client";

import { useEffect, useState } from "react";
import { Briefcase, Calendar, MapPin, Wallet } from "lucide-react";
import { getJobs } from "@/lib/actions/job";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString();
}

function JobCard({ job }) {
  const salary =
    job.minSalary && job.maxSalary
      ? `${job.currency || "USD"} ${job.minSalary} – ${job.maxSalary}`
      : "—";

  const location = job.isRemote ? "Remote" : job.location || "—";
  const status = job.status || "active";

  return (
    <article className="card job-card">
      <div className="job-card-top">
        <div className="job-card-icon">
          <Briefcase size={22} />
        </div>
        <div className="job-card-info">
          <div className="job-card-title-row">
            <h2>{job.jobTitle || "Untitled role"}</h2>
            <span className={`job-card-status ${status}`}>{status}</span>
          </div>
          <p className="job-card-category">{job.jobCategory || "General"}</p>
        </div>
      </div>

      <div className="job-card-tags">
        {job.jobType && <span className="job-card-tag">{job.jobType}</span>}
        {job.isRemote && <span className="job-card-tag remote">Remote</span>}
      </div>

      <div className="job-card-meta">
        <span><Wallet size={14} /> {salary}</span>
        <span><MapPin size={14} /> {location}</span>
        <span><Calendar size={14} /> Deadline: {formatDate(job.deadline)}</span>
        <span><Calendar size={14} /> Posted: {formatDate(job.createdAt)}</span>
      </div>

      {job.responsibilities && (
        <div className="job-card-section">
          <strong>Responsibilities</strong>
          <p>{job.responsibilities}</p>
        </div>
      )}

      {job.requirements && (
        <div className="job-card-section">
          <strong>Requirements</strong>
          <p>{job.requirements}</p>
        </div>
      )}

      {job.benefits && (
        <div className="job-card-section">
          <strong>Benefits</strong>
          <p>{job.benefits}</p>
        </div>
      )}
    </article>
  );
}

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs().then((data) => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="page jobs-page">
        <h1>Browse Jobs</h1>
        <p className="subtitle">Loading jobs...</p>
        <div className="card">
          <p className="browse-message">Loading...</p>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="page jobs-page">
        <h1>Browse Jobs</h1>
        <p className="subtitle">0 jobs on HireLoop</p>
        <div className="card">
          <p className="browse-message">No jobs posted yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page jobs-page">
      <h1>Browse Jobs</h1>
      <p className="subtitle">{jobs.length} jobs on HireLoop</p>

      <div className="jobs-list">
        {jobs.map((job) => (
          <JobCard key={String(job._id)} job={job} />
        ))}
      </div>
    </div>
  );
}
