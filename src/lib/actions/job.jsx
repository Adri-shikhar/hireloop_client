// Example of how your "@/lib/actions/job.js" file should look:
export async function createJob(payload) {
    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      // If the server crashed (500), read it as text first to see what went wrong
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