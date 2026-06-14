import { notFound } from "next/navigation";
import JobDetailView from "@/components/recruiter/jobs/JobDetailView";
import { getJobById, normalizeId } from "@/lib/api/jobs";

export default async function RecruiterJobDetailPage({ params }) {
  const { id } = await params;
  const job = await getJobById(normalizeId(id));

  if (!job) {
    notFound();
  }

  return <JobDetailView job={job} id={normalizeId(id)} />;
}
