import { API, parseJson } from "@/lib/api";

export async function createCompany(payload) {
  try {
    const response = await fetch(`${API}/api/companies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await parseJson(response);
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

export async function getCompany(recruiterId) {
  try {
    const response = await fetch(`${API}/api/my-companies?recruiterId=${recruiterId}`);
    return await parseJson(response);
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

export async function getCompanies() {
  try {
    const response = await fetch(`${API}/api/companies`);
    const data = await parseJson(response);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}
