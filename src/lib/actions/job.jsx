import { API, parseJson } from "@/lib/api";

export async function createJob(payload) {
  try {
    const response = await fetch(`${API}/api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Server error:", await response.text());
      return { error: "Server returned error status" };
    }

    return await parseJson(response);
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

export async function getJobs() {
  try {
    const response = await fetch(`${API}/api/jobs`);
    const data = await parseJson(response);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}

export async function getMyJobs(recruiterId) {
  try {
    const response = await fetch(`${API}/api/my-jobs?recruiterId=${recruiterId}`);
    const data = await parseJson(response);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}
