"use client";
import { IMenuItem } from "@/models/menu";
import MenuItem from "./menu-item";

export default function Menu({ id }: { id: string }) {
  const menus: IMenuItem[] = [
    { path: `/players/${id}`, title: "Overview" },
    { path: `/players/${id}/matches`, title: "Match History" },
    { path: `/players/${id}/heroes`, title: "Heroes" },
    { path: `/players/${id}/totals`, title: "Totals" },
    { path: `/players/${id}/insights`, title: "Insights" },
  ];
  return (
    <ul className="flex w-full gap-1.5 overflow-x-auto rounded-2xl border border-border/70 bg-muted/40 p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {menus.map((menu) => (
        <MenuItem menu={menu} key={menu.title} />
      ))}
    </ul>
  );
}
