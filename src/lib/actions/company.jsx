export async function createCompany(payload) {
  try {
    const response = await fetch("http://localhost:5000/api/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error) {
    console.error("Fetch implementation failed:", error);
    return null;
  }
}

export async function getCompany(recruiterId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/my-companies?recruiterId=${recruiterId}`,
    );
    return await response.json();
  } catch (error) {
    console.error("Fetch implementation failed:", error);
    return null;
  }
}
