"use client";

import Link from "next/link";
import { useState } from "react"; // 1. Import useState
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; 

export default function SignInPage() {
  const router = useRouter();
  
  // 2. Set up state for loading and errors
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true); // Disable button & show loading state
    setErrorMessage(""); // Clear previous errors

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      redirectTo: "/", // This might auto-redirect depending on your auth setup
    });

    if (error) {
      console.error(error);
      // 3. Display the error to the user
      setErrorMessage(error.message || "Failed to sign in. Please check your credentials.");
      setIsPending(false); // Re-enable the button
      return; 
    }

    if (data) {
      console.log(data);
      // If your auth library doesn't auto-redirect, do it manually:
      router.push("/"); 
    }
  };

  return (
    <div className="page">
      <h1>Sign In</h1>
      <p className="subtitle">Welcome back to HireLoop.</p>

      <div className="card form-box">
        <form onSubmit={handleSubmit}>
          
          {/* 4. Show the error message if it exists */}
          {errorMessage && (
            <div className="alert-error">
              {errorMessage}
            </div>
          )}

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
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="form-link">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up">Get Started</Link>
        </p>
      </div>
    </div>
  );
}