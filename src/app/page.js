import Link from "next/link";
import globeImg from "@/Assets/images/globe.png";

export default function Home() {
  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="badge-icon">💼</span>
          50,000+ NEW JOBS THIS MONTH
        </div>

        <h1>Find Your Dream Job Today</h1>

        <p className="hero-text">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <form className="search-form" action="/jobs" method="get">
          <div className="search-field">
            <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" />
            </svg>
            <input type="text" name="q" placeholder="Job title, skill or company" />
          </div>

          <div className="search-divider"></div>

          <div className="search-field">
            <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s6-5.5 6-10a6 6 0 10-12 0c0 4.5 6 10 6 10z" />
              <circle cx="12" cy="11" r="2.5" />
            </svg>
            <input type="text" name="location" placeholder="Location or Remote" />
          </div>

          <button type="submit" className="search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" />
            </svg>
          </button>
        </form>

        <div className="trending">
          <span>Trending Position</span>
          <Link href="/jobs?q=Product Designer" className="tag">Product Designer</Link>
          <Link href="/jobs?q=AI Engineering" className="tag">AI Engineering</Link>
          <Link href="/jobs?q=Dev-ops Engineer" className="tag">Dev-ops Engineer</Link>
        </div>
      </section>

      {/* Globe with text overlay */}
      <section className="globe-area">
        <div className="globe-wrapper">
          <img src={globeImg.src} alt="Global job opportunities" className="globe-img" />
          <p className="globe-text">
            Assisting over <strong>15,000 job seekers</strong> find their dream positions.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path d="M3 9l2-4h14l2 4" />
          </svg>
          <div className="number">50K</div>
          <div className="label">Active Jobs</div>
        </div>

        <div className="stat-card">
          <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
          </svg>
          <div className="number">12K</div>
          <div className="label">Companies</div>
        </div>

        <div className="stat-card">
          <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="8" r="3" />
            <path d="M10 14c-4 0-6 2-6 4v1h12v-1c0-2-2-4-6-4z" />
            <circle cx="17" cy="10" r="2.5" />
            <path d="M17 15c2.5 0 4 1.2 4 3v1h-5" />
          </svg>
          <div className="number">2M</div>
          <div className="label">Job Seekers</div>
        </div>

        <div className="stat-card">
          <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
          </svg>
          <div className="number">97%</div>
          <div className="label">Satisfaction Rate</div>
        </div>
      </section>
    </main>
  );
}
