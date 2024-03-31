import PlayerNav from "./player-nav";
import PlayerProfile from "./player-profile";

export default function PlayerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  return (
    <div className="w-full h-full flex-1 space-y-4 p-8 pt-6">
      <PlayerNav id={params.id} />
      <div className=" h-full w-full">{children}</div>
    </div>
  );
}
