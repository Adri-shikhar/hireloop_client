"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/Assets/images/logo.png";

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/companies", label: "Company" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={logo}
            alt="HireLoop"
            height={28}
            width={140}
            className="h-7 w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4 sm:gap-5">
          <span className="hidden h-5 w-px bg-white/15 sm:block" aria-hidden="true" />
          <Link
            href="/sign-in"
            className={`text-sm font-medium transition-colors ${
              pathname === "/sign-in"
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="hireloop-btn-primary rounded-lg px-4 py-2 text-sm font-semibold text-white sm:px-5"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <div className="flex gap-4 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="whitespace-nowrap text-xs font-medium text-gray-400 hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
