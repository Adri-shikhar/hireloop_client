import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Browse Jobs | HireLoop",
  description: "Search and filter thousands of curated job opportunities.",
};

export default function JobsPage({ searchParams }) {
  const query = searchParams?.q ?? "";
  const location = searchParams?.location ?? "";

  return (
    <PageShell
      title="Browse Jobs"
      description="Search and filter thousands of curated opportunities from top companies worldwide."
    >
      {(query || location) && (
        <div className="mb-8 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-200">
          Showing results
          {query && (
            <>
              {" "}
              for <span className="font-semibold text-white">&quot;{query}&quot;</span>
            </>
          )}
          {location && (
            <>
              {" "}
              in <span className="font-semibold text-white">&quot;{location}&quot;</span>
            </>
          )}
        </div>
      )}

      <div className="hireloop-stat-card rounded-2xl p-8 text-center">
        <p className="text-gray-400">
          Job listings will appear here. Use the search on the{" "}
          <Link href="/" className="text-indigo-400 hover:text-indigo-300">
            homepage
          </Link>{" "}
          to find roles by title, skill, or location.
        </p>
      </div>
    </PageShell>
  );
}
