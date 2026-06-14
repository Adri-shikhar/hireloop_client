import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export async function getCompanies() {
  const data = await serverFetch("/api/companies");
  return Array.isArray(data) ? data : [];
}

export async function getCompanyById(companyId) {
  const data = await serverFetch(`/api/companies/${companyId}`);
  if (!data || data.error) return null;
  return data;
}

export async function getRecruiterCompany(recruiterId) {
  return serverFetch(`/api/my-companies?recruiterId=${recruiterId}`);
}

export async function getLoggedInRecruiterCompany() {
  const user = await getUserSession();
  if (!user?.id) return null;
  return getRecruiterCompany(user.id);
}
