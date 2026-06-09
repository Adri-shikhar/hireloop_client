"use client";

import Link from "next/link";
import { useState } from "react"; // 1. Import useState
import logo from "@/Assets/images/logo.png";
import { authClient, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  
  // 2. Add state to track the sign-out process
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true); // 3. Start the loading state
    
    try {
      await authClient.signOut();
      // Note: We don't necessarily set isSigningOut back to false here 
      // because usually signing out redirects the user or refreshes the page!
    } catch (error) {
      console.error("Failed to sign out:", error);
      setIsSigningOut(false); // Only reset if there was an error
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          <img src={logo.src} alt="HireLoop" className="logo-img" />
        </Link>

        <div className="navbar-right">
          <ul className="navbar-links">
            <li><Link href="/jobs">Browse Jobs</Link></li>
            <li><Link href="/companies">Company</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>

          <span className="nav-divider"></span>

          <div className="navbar-actions">
            {isPending ? (
              <span className="nav-loading">...</span>
            ) : session?.user ? (
              <>
                <span className="user-name">
                  {session.user.name || session.user.email}
                </span>
                
                {/* 4. Updated Sign Out Button */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="btn-sign-out"
                  disabled={isSigningOut} // Prevent double-clicking
                  style={{
                    backgroundColor: "#e53e3e", // A nice standard red
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: isSigningOut ? "not-allowed" : "pointer",
                    opacity: isSigningOut ? 0.7 : 1,
                    transition: "all 0.2s ease"
                  }}
                >
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="sign-in-link">
                  Sign In
                </Link>
                <Link href="/sign-up" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}