import BentoCard from "@/components/ui/BentoCard";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

/**
 * KPI metric tile for bento analytics grids.
 */
export default function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp = true,
  className,
}) {
  return (
    <BentoCard span="sm" className={cn("metric-card", className)} ariaLabel={`${label}: ${value}`}>
      <div className="metric-card-header">
        {Icon && (
          <div className="metric-card-icon" aria-hidden="true">
            <Icon size={18} />
          </div>
        )}
        {trend && (
          <Badge variant={trendUp ? "success" : "warning"}>{trend}</Badge>
        )}
      </div>
      <p className="metric-card-value" aria-hidden="true">{value}</p>
      <p className="metric-card-label">{label}</p>
    </BentoCard>
  );
}
