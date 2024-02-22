import PlayerProfile from "@/components/player-profile";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PlayerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  return (
    <div className="h-full w-full mx-auto container grid grid-cols-4 grid-rows-4 py-4 gap-4">
      <PlayerProfile id={params.id} />
      {children}
    </div>
  );
}
