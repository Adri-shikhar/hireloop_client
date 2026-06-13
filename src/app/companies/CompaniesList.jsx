"use client";

import { useEffect, useState } from "react";
import { Building2, Globe, MapPin, Users } from "lucide-react";
import { getCompanies } from "@/lib/actions/company";

function getWebsite(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `https://${url}`;
}

function CompanyCard({ company }) {
  const website = getWebsite(company.websiteUrl);
  const status = company.status?.toLowerCase() || "pending";

  return (
    <article className="card company-card">
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
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="company-card-link"
            >
              <Globe size={14} />
              {company.websiteUrl}
            </a>
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
    </article>
  );
}

export default function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies().then((data) => {
      setCompanies(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="page companies-page">
        <h1>Companies</h1>
        <p className="subtitle">Loading companies...</p>
        <div className="card">
          <p className="browse-message">Loading...</p>
        </div>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="page companies-page">
        <h1>Companies</h1>
        <p className="subtitle">0 companies on HireLoop</p>
        <div className="card">
          <p className="browse-message">No company profiles yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page companies-page">
      <h1>Companies</h1>
      <p className="subtitle">{companies.length} companies on HireLoop</p>

      <div className="companies-list">
        {companies.map((company) => (
          <CompanyCard key={String(company._id)} company={company} />
        ))}
      </div>
    </div>
  );
}
