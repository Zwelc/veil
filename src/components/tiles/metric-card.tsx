import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Compact icon + label + value card used for summary rows. */
export function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail?: string;
  className?: string;
}) {
  return (
    <Card size="sm" className={cn("bg-card/70", className)}>
      <CardContent className="flex items-center gap-3 py-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {label}
          </p>
          <p className="truncate text-lg font-bold tabular-nums">{value}</p>
          {detail && (
            <p className="truncate text-xs text-muted-foreground">{detail}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
