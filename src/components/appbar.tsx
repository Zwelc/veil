"use client";

import Link from "next/link";
import Search from "./search";

function Appbar() {
  return (
    <nav className=" bg-background border-b border-static  w-full h-16 py-4 ">
      <div className="flex items-center justify-between h-full w-full  mx-auto container">
        <Link href="/" passHref>
          <span className="text-4xl font-bold tracking-wide  cursor-pointer uppercase">
            Veil
          </span>
        </Link>

        <Search />
      </div>
    </nav>
  );
}

export default Appbar;
