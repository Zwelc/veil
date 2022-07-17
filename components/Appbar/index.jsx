import Link from "next/link";
import Search from "../search";

function Appbar() {
  return (
    <nav
      className="w-full h-16 bg-slate-800  shadow-md
	 px-4 flex items-center fixed z-30 justify-between"
    >
      <Link href="/" passHref>
        <span className="text-xl font-medium text-neutral-200 cursor-pointer">
          Veil
        </span>
      </Link>
      <Search />
    </nav>
  );
}

export default Appbar;
