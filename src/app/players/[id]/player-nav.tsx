"use client";

import Menu from "@/components/layout/menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import usePlayer from "@/hooks/usePlayer";
import { usePlayerHeroes } from "@/hooks/usePlayer";
import { countries, hero_lore } from "dotaconstants";
import { MapPin, UserRound } from "lucide-react";
import Image from "next/image";
import { IHero } from "@/models/hero";

const heroVoiceLines: Record<string, string> = {
  pudge: "Fresh meat!",
};

export default function PlayerNav({ id }: { id: string }) {
  const { data: player, isLoading } = usePlayer(id);
  const { data: heroStats } = usePlayerHeroes(id);
  const profile = player?.data?.profile;
  const countryCode = profile?.loccountrycode;
  const country = countryCode ? countries[countryCode]?.name.common : undefined;
  const mostPlayedHero = heroStats?.reduce<IHero | undefined>(
    (mostPlayed, hero) =>
      !mostPlayed || hero.games > mostPlayed.games ? hero : mostPlayed,
    undefined,
  );
  const heroSlug = mostPlayedHero?.image.match(/\/([^/?]+)\.png/)?.[1];
  const heroLore = heroSlug
    ? (hero_lore as Record<string, string>)[heroSlug]
    : undefined;
  const loreExcerpt = heroLore?.split(/(?<=[.!?])\s+/)[0];
  const voiceLine = heroSlug ? heroVoiceLines[heroSlug] : undefined;
  const heroQuote = voiceLine ?? loreExcerpt;
  const quoteIsExcerpt = !voiceLine;

  return (
    <div className="flex w-full flex-col gap-4">
      <Card className="relative overflow-hidden border-primary/10 bg-gradient-to-br from-card via-card to-primary/[0.06] shadow-md shadow-primary/[0.03]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-primary/[0.07] blur-3xl"
        />
        <CardContent className="relative flex flex-col gap-5 py-5 sm:py-6 lg:flex-row lg:items-stretch lg:justify-between lg:gap-8">
          <div className="flex min-w-0 flex-col items-center gap-5 sm:flex-row sm:gap-6">
            {isLoading ? (
              <div className="size-24 shrink-0 animate-pulse rounded-full bg-muted ring-4 ring-background" />
            ) : (
              <Avatar className="size-24 shrink-0 shadow-xl ring-4 ring-background">
                <AvatarImage src={profile?.avatarfull} />
                <AvatarFallback>
                  {profile?.personaname?.charAt(0) ?? <UserRound />}
                </AvatarFallback>
              </Avatar>
            )}

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="mb-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Player profile
              </p>
              <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
                {isLoading
                  ? "Loading player…"
                  : (profile?.personaname ?? "Player profile")}
              </h1>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  {country ?? "Country undisclosed"}
                </span>
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1">
                  Account · {id}
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-56 items-center justify-between overflow-hidden rounded-xl border border-border/60 bg-background/55 px-5 pt-4 lg:w-[min(48%,32rem)] lg:shrink-0">
            <div className="relative z-10 max-w-[53%] py-3">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase">
                {mostPlayedHero ? "Most played hero" : "Hero spotlight"}
              </p>
              {mostPlayedHero ? (
                <>
                  <h2 className="mt-1 text-lg font-bold tracking-tight">
                    {mostPlayedHero.name}
                  </h2>
                  <blockquote className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    “
                    {heroQuote
                      ? `${heroQuote.slice(0, 112)}${heroQuote.length > 112 ? "…" : ""}`
                      : "A favorite among the player's heroes."}
                    ”
                  </blockquote>
                  <p className="mt-2 text-xs text-muted-foreground/80">
                    {quoteIsExcerpt
                      ? "Hero lore excerpt"
                      : "In-game voice line"}
                    {mostPlayedHero.games > 0 &&
                      ` · ${mostPlayedHero.games.toLocaleString()} games`}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  {isLoading
                    ? "Finding their signature pick…"
                    : "Hero data unavailable"}
                </p>
              )}
            </div>
            {mostPlayedHero && heroSlug && (
              <div className="absolute inset-y-0 right-0 w-[44%] opacity-95">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
                <Image
                  src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${heroSlug}_vert.jpg`}
                  alt={`${mostPlayedHero.name} hero artwork`}
                  fill
                  sizes="(min-width: 1024px) 240px, 50vw"
                  loading="eager"
                  className="object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Menu id={id} />
      <Separator className="opacity-60" />
    </div>
  );
}
