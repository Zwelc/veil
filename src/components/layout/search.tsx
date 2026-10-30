"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSearch } from "@/hooks/useSearch";

export default function Search({
  variant = "compact",
}: {
  variant?: "compact" | "hero";
}) {
  const router = useRouter();
  const { search, setSearch } = useSearch();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/`);
  };

  const isHero = variant === "hero";

  return (
    <form className="w-full" onSubmit={handleSubmit} role="search">
      <label
        className="sr-only"
        htmlFor={isHero ? "landing-player-search" : "nav-player-search"}
      >
        Search players by name
      </label>
      <div
        className={
          isHero
            ? "flex w-full items-center gap-2 rounded-2xl border border-border/70 bg-background p-2 shadow-lg shadow-primary/5 ring-1 ring-foreground/[0.03] focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10"
            : "flex w-full max-w-sm items-center gap-2"
        }
      >
        <Input
          id={isHero ? "landing-player-search" : "nav-player-search"}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={isHero ? "Search a player name…" : "Search players"}
          type="search"
          autoComplete="off"
          className={
            isHero
              ? "h-12 border-0 bg-transparent text-base shadow-none focus-visible:border-0 focus-visible:ring-0 md:h-14 md:text-lg"
              : undefined
          }
        />
        <Button
          type="submit"
          size={isHero ? "lg" : "icon-sm"}
          className={
            isHero ? "h-12 shrink-0 rounded-xl px-5 md:h-14" : "shrink-0"
          }
          aria-label="Search players"
        >
          <SearchIcon aria-hidden="true" className="size-4" />
          {isHero && <span className="hidden sm:inline">Search</span>}
        </Button>
      </div>
    </form>
  );
}
