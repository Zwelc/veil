import Appbar from "../Appbar";

export default function Layout({ children }) {
  return (
    <div className="bg-gradient-to-b from-neutral-900 to-violet-800 h-screen">
      <Appbar />

      <main className="container mx-auto pt-20 h-full">{children}</main>
    </div>
  );
}
