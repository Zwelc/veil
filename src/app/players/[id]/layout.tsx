import PlayerNav from "./player-nav";

export default function PlayerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  return (
    <div className="w-full h-full flex-1 space-y-4 p-4  container mx-auto">
      <PlayerNav id={params.id} />
      <div className=" h-full w-full">{children}</div>
    </div>
  );
}
