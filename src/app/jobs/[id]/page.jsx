import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  Wallet,
} from "lucide-react";
import { getJobById, getJobs } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatSalary(min, max, currency = "USD") {
  if (!min && !max) return "Competitive salary";
  if (min && max) return `${currency} ${min} – ${max} / year`;
  return `${currency} ${min || max} / year`;
}

export default async function JobDetailsPage({ params }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  const allJobs = await getJobs();
  const similarJobs = allJobs
    .filter(
      (item) =>
        String(item._id) !== String(job._id) &&
        (item.jobCategory === job.jobCategory || item.companyId === job.companyId)
    )
    .slice(0, 3);

  const location = job.isRemote ? "Remote" : job.location || "—";
  const user = await getUserSession();
  const canApply = !user || user.role === "seeker";
  const isRecruiter = user?.role === "recruiter";

  return (
    <div className="page job-detail-page">
      <Link href="/jobs" className="detail-back-link">
        <ArrowLeft size={16} />
        Back to all jobs
      </Link>

      <div className="job-detail-grid">
        <div className="job-detail-main">
          <div className="job-detail-header">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.companyName || "Company"}
                className="job-detail-company-logo"
              />
            ) : (
              <div className="job-detail-company-logo job-detail-company-logo-fallback">
                <Building2 size={22} />
              </div>
            )}
            <div>
              <p className="job-detail-company-name">{job.companyName || "Company"}</p>
              <h1>{job.jobTitle}</h1>
              <p className="job-detail-category">{job.jobCategory || "General"} role</p>
            </div>
          </div>

          <div className="job-detail-tags">
            {job.jobType && <span className="job-card-tag">{job.jobType}</span>}
            {job.isRemote && <span className="job-card-tag remote">Remote</span>}
            <span className="job-card-tag">{location}</span>
          </div>

          {job.responsibilities && (
            <section className="detail-section">
              <h2>Responsibilities</h2>
              <p>{job.responsibilities}</p>
            </section>
          )}

          {job.requirements && (
            <section className="detail-section">
              <h2>Requirements</h2>
              <p>{job.requirements}</p>
            </section>
          )}

          {job.benefits && (
            <section className="detail-section">
              <h2>Benefits</h2>
              <p>{job.benefits}</p>
            </section>
          )}

          {similarJobs.length > 0 && (
            <section className="detail-section similar-jobs">
              <h2>Similar Jobs</h2>
              <div className="similar-jobs-list">
                {similarJobs.map((item) => (
                  <Link
                    key={String(item._id)}
                    href={`/jobs/${item._id}`}
                    className="similar-job-card"
                  >
                    <span className="similar-job-title">{item.jobTitle}</span>
                    <span className="similar-job-meta">
                      {item.companyName} · {item.isRemote ? "Remote" : item.location || "On-site"}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="job-detail-sidebar card">
          <h3>Job Overview</h3>

          <div className="job-overview-item">
            <MapPin size={18} />
            <div>
              <span className="overview-label">Location</span>
              <span>{location}</span>
            </div>
          </div>

          <div className="job-overview-item">
            <Briefcase size={18} />
            <div>
              <span className="overview-label">Job Type</span>
              <span className="capitalize">{job.jobType || "—"}</span>
            </div>
          </div>

          <div className="job-overview-item">
            <Wallet size={18} />
            <div>
              <span className="overview-label">Salary</span>
              <span>{formatSalary(job.minSalary, job.maxSalary, job.currency)}</span>
            </div>
          </div>

          <div className="job-overview-item">
            <Calendar size={18} />
            <div>
              <span className="overview-label">Deadline</span>
              <span>{formatDate(job.deadline)}</span>
            </div>
          </div>

          {job.companyId && (
            <Link href={`/companies/${job.companyId}`} className="btn-secondary detail-company-link">
              View Company
            </Link>
          )}

          {canApply && (
            <Link
              href={user ? `/jobs/${id}/apply` : `/auth/sign-in?redirect=/jobs/${id}/apply`}
              className="btn-primary detail-apply-btn"
            >
              Apply for this job
            </Link>
          )}

          {isRecruiter && (
            <p className="detail-recruiter-note">
              Recruiters cannot apply for jobs. Manage listings from your{" "}
              <Link href="/dashboard/recruiter/jobs">recruiter dashboard</Link>.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
