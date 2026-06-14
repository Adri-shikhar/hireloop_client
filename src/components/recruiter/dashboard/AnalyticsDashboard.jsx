"use client";

import Link from "next/link";
import {
  Briefcase,
  Eye,
  Mail,
  Plus,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import MetricCard from "@/components/ui/MetricCard";
import BentoCard from "@/components/ui/BentoCard";
import MiniBarChart from "@/components/ui/MiniBarChart";
import ActivityFeed from "@/components/ui/ActivityFeed";
import QuickActionsBento from "./QuickActionsBento";
import {
  MetricCardSkeleton,
  ChartSkeleton,
  ActivitySkeleton,
} from "@/components/ui/Skeleton";

function formatViews(count) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

/**
 * HireLoop Recruiter Analytics Dashboard
 * Bento grid layout with glassmorphism, loading states, and full a11y.
 */
export default function RecruiterAnalyticsDashboard() {
  const { data, isLoading, error } = useDashboardStats();

  if (error) {
    return (
      <div role="alert" className="hl-alert-error">
        <p>{error}</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div aria-busy={isLoading} aria-live="polite">
      <PageHeader
        title="Analytics Dashboard"
        description="Track hiring performance, applications, and job visibility at a glance."
        action={
          <Button href="/dashboard/recruiter/jobs/new" icon={Plus}>
            Post a Job
          </Button>
        }
      />

      {/* Bento metrics row */}
      <section className="bento-grid bento-grid-metrics" aria-label="Key metrics">
        {isLoading ? (
          <>
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </>
        ) : (
          <>
            <MetricCard
              icon={Briefcase}
              label="Active Jobs"
              value={data.activeJobs}
              trend={data.trends.activeJobs}
              trendUp
            />
            <MetricCard
              icon={Mail}
              label="Applications"
              value={data.applications}
              trend={data.trends.applications}
              trendUp
            />
            <MetricCard
              icon={Eye}
              label="Total Views"
              value={formatViews(data.totalViews)}
              trend={data.trends.totalViews}
              trendUp
            />
            <MetricCard
              icon={Users}
              label="Candidates"
              value={data.candidates}
              trend={data.trends.candidates}
              trendUp
            />
          </>
        )}
      </section>

      {/* Main bento grid */}
      <section className="bento-grid" aria-label="Dashboard overview">
        {isLoading ? (
          <>
            <ChartSkeleton />
            <BentoCard span="tall" className="min-h-[280px]">
              <div className="bento-card-title mb-4">Recent Activity</div>
              <ActivitySkeleton />
            </BentoCard>
            <BentoCard span="wide" className="min-h-[140px]">
              <div className="bento-card-title mb-4">Quick Actions</div>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="skeleton-pulse h-20 rounded-xl" aria-hidden="true" />
                ))}
              </div>
            </BentoCard>
          </>
        ) : (
          <>
            <BentoCard span="wide" className="chart-bento-card">
              <MiniBarChart
                title="Weekly Job Views"
                subtitle="Last 7 days performance"
                data={data.chartData}
              />
            </BentoCard>

            <BentoCard span="tall" ariaLabel="Recent activity">
              <div className="flex items-center justify-between mb-5">
                <h2 className="bento-card-title">Recent Activity</h2>
                <Link
                  href="/dashboard/recruiter/applications"
                  className="bento-link"
                  aria-label="View all applications"
                >
                  View all
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <ActivityFeed items={data.recentActivity} />
            </BentoCard>

            <QuickActionsBento />

            {/* Hero insight card */}
            <BentoCard span="hero" className="insight-hero-card">
              <div className="insight-hero-content">
                <span className="insight-hero-badge">Insight</span>
                <h2 className="insight-hero-title">
                  Your listings are performing 15% above average this week
                </h2>
                <p className="insight-hero-text">
                  Frontend roles are getting the most traction. Consider boosting
                  your Product Designer listing for similar reach.
                </p>
                <Button href="/dashboard/recruiter/jobs" variant="secondary">
                  View Job Performance
                </Button>
              </div>
              <div className="insight-hero-glow" aria-hidden="true" />
            </BentoCard>
          </>
        )}
      </section>
    </div>
  );
}
