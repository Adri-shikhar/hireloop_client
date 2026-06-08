import Link from "next/link";

export const metadata = {
  title: "Sign In | HireLoop",
};

export default function SignInPage() {
  return (
    <div className="page">
      <h1>Sign In</h1>
      <p className="subtitle">Welcome back to HireLoop.</p>

      <div className="card form-box">
        <form>
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
            Sign In
          </button>
        </form>

        <p className="form-link">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">Get Started</Link>
        </p>
      </div>
    </div>
  );
}
