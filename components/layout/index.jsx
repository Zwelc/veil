import Appbar from "../Appbar";

export default function Layout({ children }) {
  return (
    <>
      <Appbar />
      <div className="h-screen bg-gradient-to-bl from-slate-800 to-slate-200 flex flex-col justify-center items-center w-full relative overflow-y-auto">
        <main className="container mx-auto pt-20 h-full">{children}</main>
      </div>
    </>
  );
}
