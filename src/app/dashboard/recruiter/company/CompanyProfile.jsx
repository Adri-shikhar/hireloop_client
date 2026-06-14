"use client";

import { useEffect, useState } from "react";
import { Select, ListBox, toast } from "@heroui/react";
import { Building2, MapPin } from "lucide-react";
import { ArrowUpToLine, Globe, Pencil, ChevronDown } from "@gravity-ui/icons";
import RecruiterPageHeader from "@/components/recruiter/shared/RecruiterPageHeader";
import DashboardEmptyState from "@/components/recruiter/shared/DashboardEmptyState";
import { createCompany } from "@/lib/actions/companies";
import { useRouter } from "next/navigation";
import "@/components/recruiter/shared/forms.css";
import "./profile.css";

const INDUSTRIES = ["Technology", "Design", "Marketing", "Finance"];
const EMPLOYEE_RANGES = [
  { id: "1-10", label: "1-10 employees" },
  { id: "11-50", label: "11-50 employees" },
  { id: "51-200", label: "51-200 employees" },
  { id: "201+", label: "201+ employees" },
];

function CompanySelect({ name, label, defaultKey, items }) {
  return (
    <div className="rd-field">
      <label>{label}</label>
      <Select name={name} defaultSelectedKey={defaultKey}>
        <Select.Trigger className="rd-select-trigger">
          <Select.Value />
          <Select.Indicator><ChevronDown size={16} /></Select.Indicator>
        </Select.Trigger>
        <Select.Popover className="rd-select-popover">
          <ListBox>
            {items.map(({ id, label: itemLabel }) => (
              <ListBox.Item key={id} id={id} className="rd-select-item" textValue={itemLabel}>
                {itemLabel}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}

function CompanyView({ company, onEdit }) {
  return (
    <div className="rd-company-shell">
      <RecruiterPageHeader
        title="My Company"
        description="Your registered business profile."
        action={
          <button type="button" className="rd-btn-outline" onClick={onEdit}>
            <Pencil size={14} /> Edit Profile
          </button>
        }
      />
      <div className="rd-panel rd-company-view">
        <div className="rd-company-view-top">
          <div className="rd-company-identity">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="rd-company-logo" />
            ) : (
              <div className="rd-company-logo rd-company-logo-fallback">
                <Building2 size={28} />
              </div>
            )}
            <div>
              <div className="rd-company-title-row">
                <h2 className="rd-company-name">{company.name}</h2>
                <span className={`rd-status-badge ${company.status?.toLowerCase()}`}>
                  {company.status}
                </span>
              </div>
              <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="rd-company-link">
                <Globe size={14} /> {company.websiteUrl}
              </a>
            </div>
          </div>
        </div>

        <div className="rd-company-meta">
          {[["Industry", company.industry], ["Location", company.location], ["Team Size", company.employeeCount]].map(([label, value]) => (
            <div key={label} className="rd-company-meta-item">
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        {company.description && (
          <div className="rd-company-about">
            <h3>About</h3>
            <p>{company.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const router = useRouter();
  const [company, setCompany] = useState(recruiterCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [logoUrl, setLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setCompany(recruiterCompany);
  }, [recruiterCompany]);

  const startEditing = () => {
    setLogoUrl(company?.logo || "");
    setIsEditing(true);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, logo: "File size exceeds 5MB limit" }));
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setLogoUrl(data.data.url);
        setErrors((prev) => ({ ...prev, logo: null }));
      } else {
        setErrors((prev) => ({ ...prev, logo: "Upload failed. Try again." }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, logo: "Network error during logo upload" }));
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newErrors = {};
    if (!formData.get("companyName")) newErrors.companyName = "Company name is required";
    if (!formData.get("websiteUrl")) newErrors.websiteUrl = "Website link is required";
    if (!formData.get("location")) newErrors.location = "Location coordinates required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      name: formData.get("companyName"),
      websiteUrl: formData.get("websiteUrl"),
      industry: formData.get("industry") || "Technology",
      location: formData.get("location"),
      employeeCount: formData.get("employeeCount") || "1-10 employees",
      description: formData.get("description"),
      logo: logoUrl || company?.logo || "",
      status: company?.status || "Pending",
      recruiterId: recruiter?.id,
    };

    const result = await createCompany(payload);

    if (!result?.insertedId && !company?._id) {
      toast.error("Failed to save company profile. Please try again.");
      return;
    }

    router.refresh();

    toast.success(company ? "Company profile updated!" : "Company profile created successfully!");
    setErrors({});
    setIsEditing(false);
  };

  if (!recruiter) {
    return (
      <div className="rd-company-shell">
        <RecruiterPageHeader title="My Company" description="Sign in to manage your company profile." />
      </div>
    );
  }

  if (!company?._id && !isEditing) {
    return (
      <div className="rd-company-shell">
        <RecruiterPageHeader title="My Company" description="Set up and manage your business profile to start hiring on HireLoop." />
        <DashboardEmptyState
          icon={Building2}
          title="No company registered yet"
          description="Configure your workspace profile to start posting jobs and tracking applications."
          action={
            <button type="button" className="rd-btn-empty" onClick={() => { setLogoUrl(""); setIsEditing(true); }}>
              Register your company
            </button>
          }
        />
      </div>
    );
  }

  if (company && !isEditing) {
    return <CompanyView company={company} onEdit={startEditing} />;
  }

  return (
    <div className="rd-company-shell">
      <RecruiterPageHeader
        title={company ? "Edit Company" : "Register Company"}
        description="Enter your business details to start hiring on HireLoop."
      />
      <div className="rd-panel">
        <div className="rd-company-form-wrap">
          <h2 className="rd-company-form-title">
            {company ? "Update Company Profile" : "Configure Workspace Platform"}
          </h2>
          <form className="rd-modal-form" onSubmit={handleSubmit}>
            <div className="rd-field">
              <label htmlFor="companyName">Company Name</label>
              <input id="companyName" name="companyName" type="text" className="rd-input" placeholder="e.g. Acme Corp" defaultValue={company?.name || ""} />
              {errors.companyName && <p className="rd-field-error">{errors.companyName}</p>}
            </div>

            <CompanySelect
              name="industry"
              label="Industry / Category"
              defaultKey={(company?.industry || "technology").toLowerCase()}
              items={INDUSTRIES.map((i) => ({ id: i.toLowerCase(), label: i }))}
            />

            <div className="rd-field">
              <label htmlFor="websiteUrl">Website URL</label>
              <div className="rd-input-group">
                <span className="rd-input-prefix">https://</span>
                <input id="websiteUrl" name="websiteUrl" type="text" className="rd-input" placeholder="www.company.com" defaultValue={company?.websiteUrl || ""} />
              </div>
              {errors.websiteUrl && <p className="rd-field-error">{errors.websiteUrl}</p>}
            </div>

            <div className="rd-field">
              <label htmlFor="location">Location</label>
              <div className="rd-input-icon-wrap">
                <MapPin />
                <input id="location" name="location" type="text" className="rd-input" placeholder="City, Country" defaultValue={company?.location || ""} />
              </div>
              {errors.location && <p className="rd-field-error">{errors.location}</p>}
            </div>

            <CompanySelect name="employeeCount" label="Employee Count Range" defaultKey={company?.employeeCount || "1-10"} items={EMPLOYEE_RANGES} />

            <div className="rd-field rd-company-logo-field">
              <span className="text-zinc-400 font-medium text-sm">Company Logo</span>
              <div className="flex items-center gap-4 mt-1">
                <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                  <input type="file" accept="image/png, image/jpeg" onChange={handleLogoUpload} className="hidden" disabled={isUploading} />
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                  )}
                </label>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-300">{isUploading ? "Uploading file..." : "Upload image"}</span>
                  <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                  {errors.logo && <span className="text-xs text-danger mt-1">{errors.logo}</span>}
                </div>
              </div>
            </div>

            <div className="rd-field full-width">
              <label htmlFor="description">Brief Description</label>
              <textarea id="description" name="description" className="rd-textarea" rows={4} placeholder="Tell us about your company's mission and culture..." defaultValue={company?.description || ""} />
            </div>

            <div className="rd-company-form-actions">
              {company && (
                <button type="button" className="rd-btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              )}
              <button type="submit" className="rd-btn-primary" disabled={isUploading}>
                {company ? "Save Updates" : "Complete Setup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
