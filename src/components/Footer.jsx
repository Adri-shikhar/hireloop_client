import Link from "next/link";
import logo from "@/Assets/images/logo.png";

const footerLinks = {
  seekers: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Sign Up", href: "/auth/sign-up" },
  ],
  employers: [
    { label: "Post a Job", href: "/auth/sign-up" },
    { label: "Recruiter Dashboard", href: "/dashboard/recruiter" },
    { label: "Pricing", href: "/pricing" },
    { label: "Register Company", href: "/dashboard/recruiter/company" },
  ],
  company: [
    { label: "About HireLoop", href: "/" },
    { label: "Contact Us", href: "mailto:support@hireloop.com" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-logo">
            <img src={logo.src} alt="HireLoop" />
          </Link>
          <p>
            HireLoop connects top talent with world-class companies. Find your next role faster.
          </p>
        </div>

        <div className="site-footer-columns">
          <div className="site-footer-column">
            <h3>For Job Seekers</h3>
            <ul>
              {footerLinks.seekers.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer-column">
            <h3>For Employers</h3>
            <ul>
              {footerLinks.employers.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer-column">
            <h3>Company</h3>
            <ul>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("mailto:") ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} HireLoop. All rights reserved.</p>
      </div>
    </footer>
  );
}
