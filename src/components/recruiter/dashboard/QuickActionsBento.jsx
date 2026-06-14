import Link from "next/link";
import { Building2, FileText, Plus } from "lucide-react";
import BentoCard from "@/components/ui/BentoCard";

const actions = [
  {
    href: "/dashboard/recruiter/jobs/new",
    icon: Plus,
    label: "Post New Job",
    description: "Publish an open role",
  },
  {
    href: "/dashboard/recruiter/company",
    icon: Building2,
    label: "Manage Company",
    description: "Update your profile",
  },
  {
    href: "/dashboard/recruiter/applications",
    icon: FileText,
    label: "Review Applications",
    description: "Screen candidates",
  },
];

/**
 * Bento-style quick action tiles with hover lift micro-interaction.
 */
export default function QuickActionsBento() {
  return (
    <BentoCard span="wide" ariaLabel="Quick actions">
      <h2 className="bento-card-title">Quick Actions</h2>
      <nav className="quick-actions-bento" aria-label="Quick actions navigation">
        {actions.map(({ href, icon: Icon, label, description }) => (
          <Link key={href} href={href} className="quick-action-tile">
            <span className="quick-action-tile-icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <span className="quick-action-tile-text">
              <strong>{label}</strong>
              <small>{description}</small>
            </span>
          </Link>
        ))}
      </nav>
    </BentoCard>
  );
}
