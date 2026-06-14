import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Globe, MapPin, Users, Briefcase } from "lucide-react";
import { getCompanyById } from "@/lib/api/companies";
import { getCompanyJobs, getJobs } from "@/lib/api/jobs";

function getWebsite(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `https://${url}`;
}

export default async function CompanyDetailsPage({ params }) {
  const { id } = await params;
  const company = await getCompanyById(id);

  if (!company) {
    notFound();
  }

  const jobsFromCompanyId = await getCompanyJobs(id);
  const jobs =
    jobsFromCompanyId.length > 0
      ? jobsFromCompanyId
      : (await getJobs()).filter(
          (job) =>
            String(job.companyId) === String(id) ||
            job.companyName?.toLowerCase() === company.name?.toLowerCase()
        );
  const website = getWebsite(company.websiteUrl);
  const status = company.status?.toLowerCase() || "pending";

  return (
    <div className="page company-detail-page">
      <Link href="/companies" className="detail-back-link">
        <ArrowLeft size={16} />
        Back to all companies
      </Link>

      <div className="company-detail-header card">
        <div className="company-detail-top">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="company-detail-logo" />
          ) : (
            <div className="company-detail-logo company-detail-logo-fallback">
              <Building2 size={28} />
            </div>
          )}

          <div className="company-detail-info">
            <div className="company-detail-title-row">
              <h1>{company.name}</h1>
              <span className={`company-card-status ${status}`}>
                {company.status || "Pending"}
              </span>
            </div>

            {website && (
              <a href={website} target="_blank" rel="noreferrer" className="company-card-link">
                <Globe size={14} />
                {company.websiteUrl}
              </a>
            )}
          </div>
        </div>

        <div className="company-detail-meta-grid">
          <div className="company-detail-meta-item">
            <span className="overview-label">Industry</span>
            <span>{company.industry || "—"}</span>
          </div>
          <div className="company-detail-meta-item">
            <MapPin size={16} />
            <div>
              <span className="overview-label">Location</span>
              <span>{company.location || "—"}</span>
            </div>
          </div>
          <div className="company-detail-meta-item">
            <Users size={16} />
            <div>
              <span className="overview-label">Company Size</span>
              <span>{company.employeeCount || "—"}</span>
            </div>
          </div>
          <div className="company-detail-meta-item">
            <Briefcase size={16} />
            <div>
              <span className="overview-label">Open Jobs</span>
              <span>{jobs.length}</span>
            </div>
          </div>
        </div>

        {company.description && (
          <div className="company-detail-about">
            <h2>About the company</h2>
            <p>{company.description}</p>
          </div>
        )}
      </div>

      <section className="company-detail-jobs">
        <h2>Open Positions ({jobs.length})</h2>

        {jobs.length === 0 ? (
          <div className="card">
            <p className="browse-message">No active job listings from this company yet.</p>
          </div>
        ) : (
          <div className="company-jobs-list">
            {jobs.map((job) => (
              <Link key={String(job._id)} href={`/jobs/${job._id}`} className="card company-job-card">
                <div>
                  <h3>{job.jobTitle}</h3>
                  <p>
                    {job.jobType || "Full-time"} · {job.isRemote ? "Remote" : job.location || "On-site"}
                  </p>
                </div>
                <span className="company-job-link">View job →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
