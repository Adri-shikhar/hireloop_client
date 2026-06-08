import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Companies | HireLoop",
  description: "Explore registered companies hiring on HireLoop.",
};

export default function CompaniesPage() {
  return (
    <PageShell
      title="Companies"
      description="Discover world-class companies actively hiring on HireLoop."
    >
      <div className="hireloop-stat-card rounded-2xl p-8 text-center">
        <p className="text-gray-400">
          Company profiles and industry filters will be available here soon.
        </p>
      </div>
    </PageShell>
  );
}
