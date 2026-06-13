"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await authClient.signIn.email({ email, password });

    if (error) {
      setErrorMessage(error.message || "Failed to sign in. Please check your credentials.");
      setIsPending(false);
      return;
    }

    if (data) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="page">
      <h1>Sign In</h1>
      <p className="subtitle">Welcome back to HireLoop.</p>

      <div className="card form-box">
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="alert-error">{errorMessage}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Your password" required />
          </div>

          <button type="submit" className="btn-primary btn-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="form-link">
          Don&apos;t have an account? <Link href="/auth/sign-up">Get Started</Link>
        </p>
      </div>
    </div>
  );
}
