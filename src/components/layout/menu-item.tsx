"use client";

import { IMenuItem } from "@/models/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuItem({ menu }: { menu: IMenuItem }) {
  const pathname = usePathname();
  return (
    <li className="shrink-0" key={menu.title}>
      <Link
        href={menu.path}
        aria-current={pathname === menu.path ? "page" : undefined}
        className={`inline-flex rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
          pathname === menu.path
            ? "bg-background text-primary shadow-sm ring-1 ring-border/70"
            : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
        }`}
      >
        {menu.title}
      </Link>
    </li>
  );
}
