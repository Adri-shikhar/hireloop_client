import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Pricing | HireLoop",
  description: "Flexible plans for job seekers and recruiters.",
};

const seekerPlans = [
  { name: "Free", price: "$0", period: "forever" },
  { name: "Pro", price: "$19", period: "/month" },
  { name: "Premium", price: "$39", period: "/month" },
];

const recruiterPlans = [
  { name: "Free", price: "$0", period: "forever" },
  { name: "Growth", price: "$49", period: "/month" },
  { name: "Enterprise", price: "$149", period: "/month" },
];

function PlanCard({ name, price, period }) {
  return (
    <div className="hireloop-stat-card rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="mt-2">
        <span className="text-3xl font-bold text-white">{price}</span>
        <span className="text-sm text-gray-500">{period}</span>
      </p>
    </div>
  );
}

export default function PricingPage() {
  return (
    <PageShell
      title="Pricing"
      description="Choose the plan that fits your goals — whether you're hunting for your next role or hiring top talent."
    >
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-white">For Job Seekers</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {seekerPlans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-white">For Recruiters</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {recruiterPlans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>

      <p className="text-center text-sm text-gray-500">
        Ready to get started?{" "}
        <Link href="/sign-up" className="text-indigo-400 hover:text-indigo-300">
          Create a free account
        </Link>
      </p>
    </PageShell>
  );
}
