import { cn } from "@/lib/utils/cn";

const dotVariants = {
  success: "activity-dot-success",
  accent: "activity-dot-accent",
  info: "activity-dot-info",
};

/**
 * Accessible activity timeline for dashboard notifications.
 */
export default function ActivityFeed({ items = [], className }) {
  if (!items.length) {
    return (
      <p className="text-sm text-[var(--hl-muted)]" role="status">
        No recent activity.
      </p>
    );
  }

  return (
    <ul className={cn("activity-feed", className)} aria-label="Recent activity">
      {items.map((item) => (
        <li key={item.id} className="activity-feed-item">
          <span
            className={cn("activity-feed-dot", dotVariants[item.variant] || dotVariants.info)}
            aria-hidden="true"
          />
          <div className="activity-feed-content">
            <p>{item.text}</p>
            <time dateTime={item.isoTime || undefined}>{item.time}</time>
          </div>
        </li>
      ))}
    </ul>
  );
}
