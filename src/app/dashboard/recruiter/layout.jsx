import DashboardShell from "@/components/dashbaord/DashboardShell";
import { requireRole } from "@/lib/core/session";

export default async function RecruiterLayout({ children }) {
  await requireRole("recruiter");
  return <DashboardShell>{children}</DashboardShell>;
}
