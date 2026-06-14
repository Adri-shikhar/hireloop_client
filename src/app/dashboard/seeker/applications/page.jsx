import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import ApplicationTable from "./ApplicationTable";

export default async function SeekerApplicationsPage() {
  const user = await getUserSession();
  const applications = user?.id ? await getApplicationsByApplicant(user.id) : [];

  return <ApplicationTable applications={applications} />;
}
