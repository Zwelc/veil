import PlayerProfile from "./player-profile";

export default function PlayerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  return (
    <div className="py-2 h-full w-full grid grid-cols-8 grid-rows-6 px-6 gap-2">
      <PlayerProfile id={params.id} />
      {children}
    </div>
  );
}
