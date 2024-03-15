import PlayerProfile from "@/components/player-profile";

export default function PlayerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  return (
    <div className="py-2 h-full w-full grid grid-cols-4 grid-rows-4 px-6 gap-2">
      <PlayerProfile id={params.id} />
      {children}
    </div>
  );
}
