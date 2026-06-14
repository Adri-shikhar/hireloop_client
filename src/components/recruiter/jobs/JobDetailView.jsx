import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  Briefcase,
  Building2,
  DollarSign,
  Heart,
  MapPin,
  Pencil,
  Shield,
  Sparkles,
  Wallet,
} from "lucide-react";
import "./job-detail.css";

const BENEFIT_ICONS = [Heart, Shield, Sparkles, Wallet];

function formatSalary(min, max, currency = "USD") {
  const sym = currency === "USD" ? "$" : `${currency} `;
  if (min && max) {
    return `${sym}${Number(min).toLocaleString()} – ${sym}${Number(max).toLocaleString()} /yr`;
  }
  if (min || max) return `${sym}${Number(min || max).toLocaleString()} /yr`;
  return "Competitive";
}

function parseBulletList(text) {
  if (!text) return [];
  return text
    .split(/\n/)
    .flatMap((line) => line.split(/•|·/))
    .map((item) => item.replace(/^[-–]\s*/, "").trim())
    .filter(Boolean);
}

function parseRequirementTags(job) {
  const tags = [job.jobCategory, job.jobType].filter(Boolean);
  if (tags.length > 0) return tags;

  const firstLine = job.requirements?.split("\n")[0] || "";
  if (firstLine.includes(",")) {
    return firstLine.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 6);
  }

  return [];
}

export default function JobDetailView({ job, id }) {
  const location = job.isRemote ? "Remote" : job.location || "—";
  const responsibilities = parseBulletList(job.responsibilities);
  const requirements = parseBulletList(job.requirements);
  const benefits = parseBulletList(job.benefits);
  const requirementTags = parseRequirementTags(job);

  return (
    <div className="rd-job-detail">
      <Link href="/dashboard/recruiter/jobs" className="rd-job-detail-back">
        <ArrowLeft size={16} />
        Back to jobs
      </Link>

      <div className="rd-job-detail-shell">
        <header className="rd-job-detail-header">
          <div className="rd-job-detail-header-left">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={job.companyName || "Company"}
                className="rd-job-detail-logo"
              />
            ) : (
              <div className="rd-job-detail-logo rd-job-detail-logo-fallback">
                <Building2 size={28} />
              </div>
            )}
            <div>
              <h1>{job.jobTitle}</h1>
              <div className="rd-job-detail-company">
                <span>{job.companyName || "Your company"}</span>
                <span className="rd-job-detail-verified">
                  <BadgeCheck size={14} />
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="rd-job-detail-actions">
            <button type="button" className="rd-job-detail-icon-btn" aria-label="Bookmark job">
              <Bookmark size={18} />
            </button>
            <Link href={`/jobs/${id}`} target="_blank" rel="noopener noreferrer" className="rd-job-detail-edit-btn">
              View listing
            </Link>
            <Link href={`/dashboard/recruiter/jobs/${id}/edit`} className="rd-job-detail-edit-btn">
              <Pencil size={16} />
              Edit
            </Link>
          </div>
        </header>

        <div className="rd-job-detail-stats">
          <div className="rd-job-detail-stat">
            <div className="rd-job-detail-stat-icon">
              <DollarSign size={18} />
            </div>
            <div>
              <span className="rd-job-detail-stat-label">Salary</span>
              <span className="rd-job-detail-stat-value">
                {formatSalary(job.minSalary, job.maxSalary, job.currency)}
              </span>
            </div>
          </div>
          <div className="rd-job-detail-stat">
            <div className="rd-job-detail-stat-icon">
              <MapPin size={18} />
            </div>
            <div>
              <span className="rd-job-detail-stat-label">Location</span>
              <span className="rd-job-detail-stat-value">{location}</span>
            </div>
          </div>
          <div className="rd-job-detail-stat">
            <div className="rd-job-detail-stat-icon">
              <Briefcase size={18} />
            </div>
            <div>
              <span className="rd-job-detail-stat-label">Job Type</span>
              <span className="rd-job-detail-stat-value capitalize">{job.jobType || "—"}</span>
            </div>
          </div>
          <div className="rd-job-detail-stat">
            <div className="rd-job-detail-stat-icon">
              <Wallet size={18} />
            </div>
            <div>
              <span className="rd-job-detail-stat-label">Experience</span>
              <span className="rd-job-detail-stat-value">{job.jobCategory || "—"}</span>
            </div>
          </div>
        </div>

        <div className="rd-job-detail-panel">
          {job.jobDescription && (
            <section className="rd-job-detail-section">
              <h2>Job Description</h2>
              <p className="rd-job-detail-text">{job.jobDescription}</p>
            </section>
          )}

          {responsibilities.length > 0 && (
            <section className="rd-job-detail-section">
              <h2>Responsibilities</h2>
              <ul className="rd-job-detail-list">
                {responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {(requirementTags.length > 0 || requirements.length > 0) && (
            <section className="rd-job-detail-section">
              <h2>Requirements</h2>
              {requirementTags.length > 0 && (
                <div className="rd-job-detail-tags">
                  {requirementTags.map((tag) => (
                    <span key={tag} className="rd-job-detail-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {requirements.length > 0 && (
                <ul className="rd-job-detail-list">
                  {requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {benefits.length > 0 && (
            <section className="rd-job-detail-section">
              <h2>Benefits</h2>
              <div className="rd-job-detail-benefits">
                {benefits.map((benefit, index) => {
                  const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
                  return (
                    <div key={benefit} className="rd-job-detail-benefit">
                      <span className="rd-job-detail-benefit-icon">
                        <Icon size={16} />
                      </span>
                      {benefit}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
