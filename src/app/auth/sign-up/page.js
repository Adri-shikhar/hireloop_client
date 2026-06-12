"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage("");

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      role,
      callbackURL: "/",
    });

    if (error) {
      console.error("Sign up error:", error);
      setErrorMessage(
        error.message || "Could not create your account. Please try again.",
      );
      setIsPending(false);
      return;
    }

    if (data) {
      router.push("/");
    }
  };

  return (
    <div className="page">
      <h1>Get Started</h1>
      <p className="subtitle">Create your free HireLoop account.</p>

      <div className="card form-box">
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="alert-error">{errorMessage}</div>
          )}

          <div className="form-group">
            <label htmlFor="role">I am a</label>
            <select id="role" name="role" required className="form-select">
              <option value="seeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isPending}
            style={{
              width: "100%",
              border: "none",
              cursor: isPending ? "not-allowed" : "pointer",
              padding: "12px",
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="form-link">
          Already have an account?{" "}
          <Link href="/auth/sign-in">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
