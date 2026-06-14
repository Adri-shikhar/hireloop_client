import { serverFetch } from "../core/server";
import { normalizeId } from "@/lib/utils/jobs";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export async function getJobs() {
  const data = await serverFetch("/api/jobs");
  return Array.isArray(data) ? data : [];
}

export async function getJobById(jobId) {
  const id = normalizeId(jobId);
  const data = await serverFetch(`/api/jobs/${id}`);
  if (!data || data.error) return null;
  return data;
}

export async function getCompanyJobs(companyId, status = "active") {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  try {
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getMyJobs(recruiterId) {
  const data = await serverFetch(`/api/my-jobs?recruiterId=${recruiterId}`);
  return Array.isArray(data) ? data : [];
}

export { normalizeId };
