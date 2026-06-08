import Link from "next/link";
import logo from "@/Assets/images/logo.png";

export default function Navbar() {
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
            <Link href="/sign-in" className="sign-in-link">Sign In</Link>
            <Link href="/sign-up" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
