import Link from "next/link";

export const metadata = {
  title: "Pricing | HireLoop",
};

export default function PricingPage() {
  return (
    <div className="page">
      <h1>Pricing</h1>
      <p className="subtitle">Choose the plan that fits your goals.</p>

      <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>For Job Seekers</h2>
      <div className="pricing-grid">
        <div className="stat-card">
          <div className="number">$0</div>
          <div className="label">Free</div>
        </div>
        <div className="stat-card">
          <div className="number">$19</div>
          <div className="label">Pro / month</div>
        </div>
        <div className="stat-card">
          <div className="number">$39</div>
          <div className="label">Premium / month</div>
        </div>
      </div>

      <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>For Recruiters</h2>
      <div className="pricing-grid">
        <div className="stat-card">
          <div className="number">$0</div>
          <div className="label">Free</div>
        </div>
        <div className="stat-card">
          <div className="number">$49</div>
          <div className="label">Growth / month</div>
        </div>
        <div className="stat-card">
          <div className="number">$149</div>
          <div className="label">Enterprise / month</div>
        </div>
      </div>

      <p className="form-link">
        <Link href="/sign-up" className="link">
          Create a free account
        </Link>
      </p>
    </div>
  );
}
