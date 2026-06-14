"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Briefcase,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
} from "lucide-react";
import { Avatar } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import "./sidebar.css";

const navItems = [
  { icon: LayoutGrid, href: "/dashboard/seeker", label: "Dashboard" },
  { icon: Briefcase, href: "/dashboard/seeker/jobs", label: "Jobs" },
  { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
  { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
  { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
  { icon: Settings, href: "/dashboard/seeker/settings", label: "Settings" },
];

export default function SeekerSidebar({ onNavigate }) {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const initials = (user?.name || user?.email || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside id="seeker-dashboard-sidebar" className="rd-sidebar" aria-label="Seeker navigation">
      <div className="rd-sidebar-brand">
        <Link href="/" onClick={onNavigate}>
          HireLoop
        </Link>
      </div>

      <div className="rd-sidebar-profile">
        {isPending ? (
          <div className="animate-pulse">
            <div className="rd-sidebar-profile-row">
              <div className="w-11 h-11 rounded-full bg-[#1a1a1a]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-[#1a1a1a] rounded w-24" />
                <div className="h-2 bg-[#1a1a1a] rounded w-16" />
              </div>
            </div>
          </div>
        ) : user ? (
          <>
            <div className="rd-sidebar-profile-row">
              <Avatar size="md" className="shrink-0 w-11 h-11">
                {(user.image || user.avatar) && (
                  <Avatar.Image
                    src={user.image || user.avatar}
                    alt={user.name || "User"}
                    className="object-cover"
                  />
                )}
                <Avatar.Fallback className="bg-[#1a1a1a] text-zinc-300 text-xs font-semibold">
                  {initials}
                </Avatar.Fallback>
              </Avatar>
              <div className="min-w-0">
                <div className="rd-sidebar-profile-name truncate">
                  {user.name || user.email}
                </div>
                <div className="rd-sidebar-profile-role truncate capitalize">
                  {user.role || "Seeker"}
                </div>
              </div>
            </div>
            <span className="rd-premium-badge">Seeker Account</span>
          </>
        ) : (
          <div className="rd-sidebar-profile-role">Not signed in</div>
        )}
      </div>

      <nav className="rd-sidebar-nav">
        <ul className="rd-nav-list">
          {navItems.map(({ icon: Icon, href, label }) => {
            const isActive =
              pathname === href ||
              (href !== "/dashboard/seeker" && pathname?.startsWith(href));

            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={`rd-nav-link${isActive ? " active" : ""}`}
                >
                  <Icon strokeWidth={1.75} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
