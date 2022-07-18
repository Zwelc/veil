import Link from "next/link";
import Search from "../search";
import { useRouter } from "next/router";

function Appbar() {
  const router = useRouter();
  const menus = [
    { path: "/", title: "Home" },
    { path: "/tracked", title: "Tracked" },
    { path: "/players", title: "Players" },
  ];
  return (
    <nav className=" fixed z-30 flex items-center justify-between w-full py-8 px-24  mx-auto ">
      <Link href="/" passHref>
        <span className="text-4xl font-bold tracking-wide text-violet-200   cursor-pointer">
          Veil
        </span>
      </Link>
      <ul className="flex items-center space-x-8 ">
        {menus.map((menu) => (
          <Link href={menu.path} passHref>
            <div className=" group  cursor-pointer">
              <span
                className={`text font-medium text-gray-50 ${
                  router.pathname == menu.path ? "text-fuchsia-300" : ""
                }`}
              >
                {menu.title}
              </span>
              <div className="h-0.5 bg-fuchsia-400 scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out"></div>
            </div>
          </Link>
        ))}

        <Search />
      </ul>
    </nav>
  );
}

export default Appbar;
