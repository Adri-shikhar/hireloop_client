"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import DashboardEmptyState from "@/components/recruiter/DashboardEmptyState";
import RegisterCompanyModal from "@/components/recruiter/RegisterCompanyModal";

export default function MyCompanyPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <PageHeader
        variant="recruiter"
        title="My Company"
        description="Set up and manage your business profile to start hiring on HireLoop."
      />

      <DashboardEmptyState
        icon={Building2}
        title="Company not registered yet"
        description="Set up your business profile to start posting job listings and manage your talent pipeline."
        action={
          <button
            type="button"
            className="rd-btn-empty"
            onClick={() => setModalOpen(true)}
          >
            Register your company
          </button>
        }
      />

      <RegisterCompanyModal isOpen={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
