import Link from "next/link";

export const metadata = {
  title: "Get Started | HireLoop",
};

export default function SignUpPage() {
  return (
    <div className="page">
      <h1>Get Started</h1>
      <p className="subtitle">Create your free HireLoop account.</p>

      <div className="card form-box">
        <form>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Jane Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
            />
          </div>

          <button type="button" className="btn-primary" style={{ width: "100%", border: "none", cursor: "pointer", padding: "12px" }}>
            Create Account
          </button>
        </form>

        <p className="form-link">
          Already have an account?{" "}
          <Link href="/sign-in">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
