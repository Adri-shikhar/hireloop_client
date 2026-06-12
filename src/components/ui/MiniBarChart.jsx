"use client";

import { cn } from "@/lib/utils/cn";

/**
 * CSS-only bar chart for analytics — no external chart library needed.
 * Accessible via aria-label on the container.
 */
export default function MiniBarChart({ data = [], title, subtitle }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <section aria-label={title || "Weekly analytics chart"}>
      {(title || subtitle) && (
        <header className="chart-header">
          {title && <h2 className="chart-title">{title}</h2>}
          {subtitle && <p className="chart-subtitle">{subtitle}</p>}
        </header>
      )}

      <div className="chart-bars" role="list" aria-label="Daily view counts">
        {data.map((item) => {
          const height = Math.round((item.value / max) * 100);

          return (
            <div key={item.label} className="chart-bar-col" role="listitem">
              <div
                className={cn("chart-bar")}
                style={{ "--bar-height": `${height}%` }}
                aria-label={`${item.label}: ${item.value} views`}
              >
                <span className="chart-bar-fill" />
              </div>
              <span className="chart-bar-label" aria-hidden="true">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
