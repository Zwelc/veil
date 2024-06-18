"use client";

import { IMenuItem } from "@/models/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuItem({ menu }: { menu: IMenuItem }) {
  const pathname = usePathname();
  return (
    <Link href={menu.path} passHref key={menu.title}>
      <li className=" group  cursor-pointer">
        <span
          className={` font-medium  ${
            pathname == menu.path ? "text-primary" : ""
          }`}
        >
          {menu.title}
        </span>
        <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
      </li>
    </Link>
  );
}
