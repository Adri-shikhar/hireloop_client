export async function createJob(payload) {
  try {
    const response = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server raw error response:", errorText);
      return { error: "Server returned error status" };
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch implementation failed:", error);
    return null;
  }
}

export async function getJobs() {
  try {
    const response = await fetch("http://localhost:5000/api/jobs");
    return await response.json();
  } catch (error) {
    console.error("Fetch implementation failed:", error);
    return null;
  }
}

export async function getMyJobs(recruiterId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/my-jobs?recruiterId=${recruiterId}`,
    );
    return await response.json();
  } catch (error) {
    console.error("Fetch implementation failed:", error);
    return null;
  }
}
