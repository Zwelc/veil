import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatUtcTime } from "@/lib/dota";
import type { IPlayerSummary } from "@/models/player";

/**
 * The pros who played most recently, as of the page's last regeneration (ISR, up
 * to 6 hours). Labelled "recently active" with an "as of" time, never "live".
 * Server component: it renders into the static HTML.
 */
export default function LiveBoard({
  pros,
  updatedAt,
}: {
  pros: IPlayerSummary[];
  updatedAt: string | null;
}) {
  const asOf = formatUtcTime(updatedAt, updatedAt);

  return (
    <section
      aria-labelledby="live-board-heading"
      className="rounded-2xl border border-border bg-card/85 p-5 shadow-xl shadow-black/30 backdrop-blur-md"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2">
        <h2
          id="live-board-heading"
          className="flex items-center gap-2.5 text-base font-semibold"
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-ember" />
          Recently active
        </h2>
        {asOf && (
          <span className="font-mono text-xs text-muted-foreground">
            as of {asOf} UTC
          </span>
        )}
      </div>
      <ul>
        {pros.map((player) => (
          <li key={player.account_id} className="border-t border-border">
            <Link
              href={`/players/${player.account_id}`}
              className="flex min-h-13 items-center gap-3 rounded-md py-1.5 transition-colors hover:bg-accent/60 focus-visible:outline-2 focus-visible:outline-ring"
            >
              <Avatar>
                <AvatarImage src={player.avatarfull ?? undefined} alt="" />
                <AvatarFallback>{player.personaname.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1 truncate font-semibold">
                {player.personaname}
              </span>
              {player.team_tag && (
                <span className="max-w-24 truncate font-mono text-xs text-muted-foreground">
                  {player.team_tag}
                </span>
              )}
              <time
                dateTime={player.last_match_time ?? undefined}
                className="w-12 text-right font-mono text-xs text-ember tabular-nums"
              >
                {formatUtcTime(player.last_match_time, updatedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
