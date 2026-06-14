import Link from "next/link";
import { Building2, Globe, MapPin, Users } from "lucide-react";

function getWebsite(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `https://${url}`;
}

export default function CompanyCard({ company }) {
  const website = getWebsite(company.websiteUrl);
  const status = company.status?.toLowerCase() || "pending";

  return (
    <Link href={`/companies/${company._id}`} className="card company-card company-card-item">
      <div className="company-card-top">
        {company.logo ? (
          <img src={company.logo} alt={company.name} className="company-card-logo" />
        ) : (
          <div className="company-card-logo company-card-logo-fallback">
            <Building2 size={24} />
          </div>
        )}

        <div className="company-card-info">
          <div className="company-card-title-row">
            <h2>{company.name}</h2>
            <span className={`company-card-status ${status}`}>
              {company.status || "Pending"}
            </span>
          </div>

          {website && (
            <span className="company-card-link">
              <Globe size={14} />
              {company.websiteUrl}
            </span>
          )}
        </div>
      </div>

      <div className="company-card-meta">
        <span><strong>Industry:</strong> {company.industry || "—"}</span>
        <span><MapPin size={14} /> {company.location || "—"}</span>
        <span><Users size={14} /> {company.employeeCount || "—"}</span>
      </div>

      {company.description && (
        <p className="company-card-about">{company.description}</p>
      )}

      <span className="company-card-view-more">View company →</span>
    </Link>
  );
}
