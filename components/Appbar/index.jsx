import Link from "next/link";

function Appbar() {
  return (
    <nav className="w-full h-16 bg-neutral-700  shadow-md shadow-violet-400 px-4 flex items-center fixed">
      <Link href="/" passHref>
        <span className="text-xl font-medium text-neutral-200 cursor-pointer">
          Veil
        </span>
      </Link>
    </nav>
  );
}

export default Appbar;
