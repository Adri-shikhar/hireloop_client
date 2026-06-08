import Link from "next/link";

export const metadata = {
  title: "Browse Jobs | HireLoop",
};

export default function JobsPage({ searchParams }) {
  const query = searchParams.q || "";
  const location = searchParams.location || "";

  return (
    <div className="page">
      <h1>Browse Jobs</h1>
      <p className="subtitle">
        Search and filter thousands of curated opportunities.
      </p>

      {query && (
        <div className="card" style={{ marginBottom: "20px" }}>
          <p>
            Searching for: <strong>{query}</strong>
            {location && (
              <>
                {" "}
                in <strong>{location}</strong>
              </>
            )}
          </p>
        </div>
      )}

      <div className="card">
        <p style={{ color: "#aaa", textAlign: "center" }}>
          Job listings will appear here. Go back to the{" "}
          <Link href="/" className="link">
            homepage
          </Link>{" "}
          to search.
        </p>
      </div>
    </div>
  );
}
