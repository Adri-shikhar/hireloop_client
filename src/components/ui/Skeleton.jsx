import { cn } from "@/lib/utils/cn";

/** Accessible loading placeholder — marked aria-hidden since parent has aria-busy */
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("skeleton-pulse rounded-lg", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="bento-card bento-card-sm" aria-hidden="true">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-9 w-9 rounded-xl" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-8 w-20 mb-2" />
      <Skeleton className="h-4 w-28" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bento-card bento-span-2" aria-hidden="true">
      <Skeleton className="h-5 w-40 mb-6" />
      <div className="flex items-end gap-2 h-32">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="flex-1 rounded-t-md" style={{ height: `${30 + i * 8}%` }} />
        ))}
      </div>
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-2 w-2 rounded-full mt-2 shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
