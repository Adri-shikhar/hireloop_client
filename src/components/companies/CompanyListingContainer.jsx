"use client";

import CompanyCard from "@/components/companies/CompanyCard";

export default function CompanyListingContainer({ initialCompanies = [] }) {
  if (initialCompanies.length === 0) {
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
      <p className="subtitle">{initialCompanies.length} companies on HireLoop</p>

      <div className="companies-list">
        {initialCompanies.map((company) => (
          <CompanyCard key={String(company._id)} company={company} />
        ))}
      </div>
    </div>
  );
}
