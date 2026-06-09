"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
; 

export default function SignUpPage() {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    
    // --- MOVED THE AUTH LOGIC HERE ---
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      console.error("Sign up error:", error);
      // Future: maybe show an error message on the screen using useState
    }

    if (data) {
      console.log("Success:", data);
      // Future: redirect the user to the dashboard
    } else {
      console.log("Sign up failed");
    }
  };

  return (
    <div className="page">
      <h1>Get Started</h1>
      <p className="subtitle">Create your free HireLoop account.</p>

      <div className="card form-box">
        <form onSubmit={handleSubmit}>
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
            style={{ width: "100%", border: "none", cursor: "pointer", padding: "12px" }}
          >
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