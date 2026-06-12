import Link from "next/link";

export const metadata = {
  title: "Pricing | HireLoop",
};

const seekerPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["Browse all jobs", "Apply to 5 jobs/month", "Basic profile"],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month",
    featured: true,
    features: ["Unlimited applications", "Profile boost", "Application tracking", "Email alerts"],
  },
  {
    name: "Premium",
    price: "$39",
    period: "/ month",
    features: ["Everything in Pro", "Priority support", "Resume review", "Interview prep resources"],
  },
];

const recruiterPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["1 active job post", "Basic company profile", "Application inbox"],
  },
  {
    name: "Growth",
    price: "$49",
    period: "/ month",
    featured: true,
    features: ["10 active job posts", "Featured listings", "Analytics dashboard", "Team members"],
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "/ month",
    features: ["Unlimited job posts", "Dedicated support", "Custom branding", "API access"],
  },
];

function PricingCards({ plans }) {
  return (
    <div className="pricing-grid">
      {plans.map((plan) => (
        <div key={plan.name} className={`pricing-card ${plan.featured ? "featured" : ""}`}>
          <div className="plan-name">{plan.name}</div>
          <div className="plan-price">
            {plan.price}
            <span> {plan.period}</span>
          </div>
          <ul className="plan-features">
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Link href="/auth/sign-up" className="btn-primary" style={{ textAlign: "center" }}>
            Get Started
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="page" style={{ maxWidth: 960 }}>
      <h1>Pricing</h1>
      <p className="subtitle">Simple, transparent plans for job seekers and recruiters.</p>

      <section className="pricing-section">
        <h2>For Job Seekers</h2>
        <PricingCards plans={seekerPlans} />
      </section>

      <section className="pricing-section">
        <h2>For Recruiters</h2>
        <PricingCards plans={recruiterPlans} />
      </section>

      <p className="form-link">
        <Link href="/auth/sign-up" className="link">
          Create a free account
        </Link>
      </p>
    </div>
  );
}
