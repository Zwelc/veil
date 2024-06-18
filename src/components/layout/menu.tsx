"use client";
import { IMenuItem } from "@/models/menu";
import MenuItem from "./menu-item";

export default function Menu({ id }: { id: string }) {
  const menus: IMenuItem[] = [
    { path: `/players/${id}`, title: "Overview" },
    { path: `/players/${id}/matches`, title: "Match History" },
    { path: `/players/${id}/heroes`, title: "Heroes" },
    { path: `/players/${id}/totals`, title: "Totals" },
  ];
  return (
    <ul className="flex space-x-4 mx-2">
      {menus.map((menu) => (
        <MenuItem menu={menu} key={menu.title} />
      ))}
    </ul>
  );
}
