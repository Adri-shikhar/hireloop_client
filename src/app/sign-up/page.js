"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignUpPage() {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    
    // 1. Get the role from the dropdown
    const role = formData.get("role"); 
    
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      role,  // 2. Pass the dynamic role to your database/auth client
    });

    if (error) {
      console.error("Sign up error:", error);
    }

    if (data) {
      console.log("Success:", data);
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
          
          {/* 3. Updated Dropdown Menu Styling */}
          <div className="form-group">
            <label htmlFor="role">I am a</label>
            <select 
              id="role" 
              name="role" 
              required
              style={{ 
                width: "100%", 
                padding: "10px", 
                marginTop: "4px", 
                marginBottom: "16px",
                backgroundColor: "#f8fafc", /* Light slate/blue background */
                color: "#1e293b",           /* Dark slate text */
                border: "1px solid #cbd5e1", /* Subtle gray border */
                borderRadius: "6px",        /* Rounded edges */
                fontSize: "16px",           /* Readable text size */
                cursor: "pointer"           /* Pointer cursor on hover */
              }} 
            >
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