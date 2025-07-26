import PlayerNav from "./player-nav";

export default async function PlayerLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id: string }>;
  }>
) {
  const params = await props.params;

  const { children } = props;

  return (
    <div className="w-full h-full flex-1 space-y-4 p-4  container mx-auto">
      <PlayerNav id={params.id} />
      <div className=" h-full w-full">{children}</div>
    </div>
  );
}
