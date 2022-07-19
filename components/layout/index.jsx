import Appbar from "../Appbar";

export default function Layout({ children }) {
  return (
    <>
      <Appbar />
      <div className="h-screen px-24 py-28 bg-gradient-to-bl from-fuchsia-900 to-slate-400 flex flex-col justify-center items-center w-full relative overflow-y-auto scroll-smooth">
        <main className="w-full h-full">{children}</main>
      </div>
    </>
  );
}
