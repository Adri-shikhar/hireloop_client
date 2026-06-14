import RecruiterPageHeader from "@/components/recruiter/shared/RecruiterPageHeader";
import DashboardEmptyState from "@/components/recruiter/shared/DashboardEmptyState";
import { CreditCard } from "lucide-react";

export default function SeekerBillingPage() {
  return (
    <>
      <RecruiterPageHeader
        title="Billing"
        description="Manage your seeker plan and payment details."
      />
      <DashboardEmptyState
        icon={CreditCard}
        title="Billing coming soon"
        description="Plan upgrades and billing history will be available in a future update."
      />
    </>
  );
}
