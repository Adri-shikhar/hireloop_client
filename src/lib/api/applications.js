import { serverFetch } from "../core/server";

export async function getApplicationsByApplicant(applicantId) {
  const data = await serverFetch(`/api/applications?applicantId=${applicantId}`);
  return Array.isArray(data) ? data : [];
}
