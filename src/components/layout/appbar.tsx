"use client";

import Link from "next/link";
import Search from "./search";
import { ThemeToggle } from "./theme-toggle";

function Appbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="w-full container mx-auto p-4">
        <div className="flex items-center justify-between h-full w-full">
          <Link href="/" passHref>
            <span className="cursor-pointer text-2xl font-black tracking-[0.18em] text-foreground uppercase">
              Veil
            </span>
          </Link>

          <div className="flex max-w-lg items-center gap-3 sm:gap-4">
            <Search />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Appbar;
