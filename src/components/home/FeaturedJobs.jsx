import Link from "next/link";
import { Briefcase, MapPin, Wallet } from "lucide-react";
import { getJobs } from "@/lib/api/jobs";

function formatSalary(job) {
  if (job.minSalary && job.maxSalary) {
    return `${job.currency || "USD"} ${job.minSalary} – ${job.maxSalary}`;
  }
  return "Competitive salary";
}

export default async function FeaturedJobs() {
  const jobs = await getJobs();
  const featured = jobs
    .filter((job) => !job.status || job.status === "active")
    .slice(0, 6);

  if (featured.length === 0) {
    return (
      <section className="featured-jobs">
        <div className="featured-jobs-header">
          <h2>Featured Jobs</h2>
          <p>Hand-picked opportunities from top companies</p>
        </div>
        <div className="card">
          <p className="browse-message">No jobs posted yet. Check back soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-jobs">
      <div className="featured-jobs-header">
        <h2>Featured Jobs</h2>
        <p>Hand-picked opportunities from top companies</p>
        <Link href="/jobs" className="featured-jobs-view-all">
          View all jobs →
        </Link>
      </div>

      <div className="featured-jobs-grid">
        {featured.map((job) => (
          <Link key={String(job._id)} href={`/jobs/${job._id}`} className="card featured-job-card">
            <div className="featured-job-top">
              <div className="job-card-icon">
                <Briefcase size={20} />
              </div>
              <div>
                <h3>{job.jobTitle}</h3>
                <p>{job.companyName || "Company"}</p>
              </div>
            </div>

            <div className="featured-job-meta">
              <span>
                <MapPin size={14} />
                {job.isRemote ? "Remote" : job.location || "On-site"}
              </span>
              <span>
                <Wallet size={14} />
                {formatSalary(job)}
              </span>
            </div>

            {job.jobType && <span className="job-card-tag">{job.jobType}</span>}
          </Link>
        ))}
      </div>
    </section>
  );
}
