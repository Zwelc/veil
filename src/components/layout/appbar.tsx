"use client";

import Link from "next/link";
import Search from "./search";
import { ThemeToggle } from "./theme-toggle";

function Appbar() {
  return (
    <nav className=" w-full py-2 px-6 bg-background">
      <div className="w-full container mx-auto">
        <div className="flex items-center justify-between h-full w-full">
          <Link href="/" passHref>
            <span className="text-3xl font-bold tracking-wide  cursor-pointer uppercase">
              Veil
            </span>
          </Link>

          <div className="flex space-x-4 items-center max-w-lg">
            <Search />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Appbar;
