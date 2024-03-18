import { VisSingleContainer, VisDonut, VisTooltip } from "@unovis/react";
import { Donut } from "@unovis/ts";
type Data = {
  name: string;
  win: number;
  games: number;
};
export default function DonutComponent({ data }: { data: Data[] }) {
  // const data: number[] = data
  const triggers = { [Donut.selectors.segment]: (d) => d.data.name };
  return (
    <VisSingleContainer data={data}>
      <VisTooltip triggers={triggers} />
      <VisDonut
        value={(d: Data) => d.win}
        radius={120}
        centralLabel="Games Per Side"
      />
    </VisSingleContainer>
  );
}
