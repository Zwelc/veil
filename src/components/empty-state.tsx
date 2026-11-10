import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Centered message card for empty and error states. */
export function EmptyState({
  icon: Icon,
  title,
  message,
  tone = "muted",
}: {
  icon?: LucideIcon;
  title?: string;
  message: string;
  tone?: "muted" | "error";
}) {
  return (
    <Card className="w-full">
      <CardContent
        className={cn(
          "flex flex-col items-center text-center",
          Icon || title ? "py-12" : "py-10",
        )}
      >
        {Icon && (
          <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Icon className="size-5" />
          </span>
        )}
        {title && <p className="font-semibold">{title}</p>}
        <p
          role={tone === "error" ? "alert" : undefined}
          className={cn(
            "max-w-md text-sm",
            title && "mt-1",
            tone === "error" ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {message}
        </p>
      </CardContent>
    </Card>
  );
}
