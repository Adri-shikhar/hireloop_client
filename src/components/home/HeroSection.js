"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import globe from "@/Assets/images/globe.png";

const trendingTags = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

function SearchIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function LocationIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function BriefcaseIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m-12 0A48.114 48.114 0 001.837 6.53 2.18 2.18 0 001 8.706v3.783a2.18 2.18 0 00.75 1.661m16.5 0h-15" />
    </svg>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    const qs = params.toString();
    router.push(qs ? `/jobs?${qs}` : "/jobs");
  }

  return (
    <section className="relative overflow-hidden pb-8 pt-28 sm:pt-32">
      <div className="hireloop-stars absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-[#0a0a12] via-[#050508] to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="hireloop-badge-glow mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-gray-300 sm:text-sm">
          <BriefcaseIcon className="h-4 w-4 text-indigo-400" />
          50,000+ NEW JOBS THIS MONTH
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
          HireLoop connects top talent with world-class companies. Browse thousands
          of curated opportunities and land your next role — faster.
        </p>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14]/90 shadow-2xl shadow-indigo-500/5 sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-3 border-b border-white/10 px-4 py-3.5 sm:border-b-0 sm:border-r">
            <SearchIcon className="h-5 w-5 shrink-0 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
            />
          </div>
          <div className="flex flex-1 items-center gap-3 px-4 py-3.5">
            <LocationIcon className="h-5 w-5 shrink-0 text-gray-500" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="m-2 flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-colors hover:bg-indigo-500 sm:w-12"
            aria-label="Search jobs"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-gray-500">Trending Position</span>
          {trendingTags.map((tag) => (
            <Link
              key={tag}
              href={`/jobs?q=${encodeURIComponent(tag)}`}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-gray-300 transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-5xl px-4 sm:mt-16 sm:px-6">
        <div className="relative">
          <Image
            src={globe}
            alt="Global job opportunities"
            className="mx-auto w-full max-w-3xl object-contain"
            priority
          />
          <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-sm font-medium text-gray-300 sm:text-base md:text-lg">
            Assisting over 15,000 job seekers find their dream positions.
          </p>
        </div>
      </div>
    </section>
  );
}
