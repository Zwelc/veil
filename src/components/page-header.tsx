import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Eyebrow + title + optional description, with an optional element on the right. */
export function PageHeader({
  eyebrow,
  title,
  description,
  aside,
  size = "lg",
  id,
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  size?: "md" | "lg";
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-3",
        className,
      )}
    >
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>
        <h2
          id={id}
          className={cn(
            "mt-1 font-bold tracking-tight",
            size === "lg" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {aside}
    </div>
  );
}

/** The rounded summary pill shown on the right of a PageHeader. */
export function HeaderBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}
