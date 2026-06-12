"use client";

import { useEffect, useState } from "react";

const MOCK_STATS = {
  activeJobs: 3,
  applications: 24,
  totalViews: 1240,
  candidates: 18,
  trends: {
    activeJobs: "+1 this week",
    applications: "+8 this week",
    totalViews: "+15%",
    candidates: "3 shortlisted",
  },
  chartData: [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 58 },
    { label: "Wed", value: 35 },
    { label: "Thu", value: 72 },
    { label: "Fri", value: 64 },
    { label: "Sat", value: 28 },
    { label: "Sun", value: 45 },
  ],
  recentActivity: [
    {
      id: 1,
      text: "New application received for Senior Frontend Engineer",
      time: "2 hours ago",
      variant: "success",
    },
    {
      id: 2,
      text: "Your job post 'Product Designer' reached 120 views",
      time: "5 hours ago",
      variant: "accent",
    },
    {
      id: 3,
      text: "Company profile verification is pending review",
      time: "1 day ago",
      variant: "info",
    },
  ],
};

/**
 * Simulates async dashboard data fetching with loading state.
 * Replace the setTimeout block with real API calls when backend is ready.
 */
export function useDashboardStats() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate network latency — swap for fetch('/api/dashboard/stats')
        await new Promise((resolve) => setTimeout(resolve, 900));

        if (!cancelled) {
          setData(MOCK_STATS);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load dashboard data");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error, refetch: () => setIsLoading(true) };
}
