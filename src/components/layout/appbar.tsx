"use client";

import Link from "next/link";
import Search from "../search";

function Appbar() {
  return (
    <nav className="border-b border-static w-full py-1 px-6">
      <div className="flex items-center justify-between h-full w-full">
        <Link href="/" passHref>
          <span className="text-3xl font-bold tracking-wide  cursor-pointer uppercase">
            Veil
          </span>
        </Link>

        <Search />
      </div>
    </nav>
  );
}

export default Appbar;
