import PlayerNav from "./player-nav";

export default async function PlayerLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ id: string }>;
  }>,
) {
  const params = await props.params;

  const { children } = props;

  return (
    <div className="container mx-auto flex w-full flex-1 flex-col gap-5 px-4 py-5 sm:px-6 lg:gap-6 lg:py-8">
      <PlayerNav id={params.id} />
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
