"use client";

import Link from "next/link";
import { useState } from "react";
import logo from "@/Assets/images/logo.png";
import { authClient, useSession } from "@/lib/auth-client";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Navbar = () => {
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
      setIsSigningOut(false);
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
            <ThemeToggle size="sm" />
            {isPending ? (
              <span className="nav-loading">...</span>
            ) : session?.user ? (
              <>
                <span className="user-name">
                  {session.user.name || session.user.email}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="btn-sign-out"
                  disabled={isSigningOut}
                >
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/sign-in" className="sign-in-link">
                  Sign In
                </Link>
                <Link href="/auth/sign-up" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
