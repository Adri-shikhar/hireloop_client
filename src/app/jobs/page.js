import JobListingContainer from "@/components/jobs/JobListingContainer";
import { getJobs } from "@/lib/api/jobs";

export const metadata = {
  title: "Browse Jobs | HireLoop",
  description: "Explore open roles from companies hiring on HireLoop.",
};

export default async function JobsPage() {
  const jobs = await getJobs();

  return <JobListingContainer initialJobs={jobs} />;
}
