"use client";

import JobCard from "@/components/jobs/JobCard";

export default function JobListingContainer({ initialJobs = [] }) {
  if (initialJobs.length === 0) {
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
      <p className="subtitle">{initialJobs.length} jobs on HireLoop</p>

      <div className="jobs-list">
        {initialJobs.map((job) => (
          <JobCard key={String(job._id)} job={job} />
        ))}
      </div>
    </div>
  );
}
