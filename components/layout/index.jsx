import Appbar from "../Appbar";

export default function Layout({ children }) {
  return (
    <>
      <Appbar />
      <div className="h-screen pt-8 bg-gradient-to-bl from-fuchsia-900 to-slate-400 flex flex-col justify-center items-center w-full relative overflow-y-auto">
        <main className="container mx-auto pt-20 h-full scroll-smooth">
          {children}
        </main>
      </div>
    </>
  );
}
