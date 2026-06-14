import JobsTable from "@/components/recruiter/jobs/JobsTable";
import { getUserSession } from "@/lib/core/session";
import { getMyJobs } from "@/lib/api/jobs";

export default async function RecruiterJobsPage() {
  const user = await getUserSession();
  const jobs = user?.id ? await getMyJobs(user.id) : [];

  return <JobsTable jobs={jobs} />;
}
