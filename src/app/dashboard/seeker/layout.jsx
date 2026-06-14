import SeekerDashboardShell from "@/components/dashbaord/SeekerDashboardShell";
import { requireRole } from "@/lib/core/session";

export default async function SeekerLayout({ children }) {
  await requireRole("seeker");
  return <SeekerDashboardShell>{children}</SeekerDashboardShell>;
}
