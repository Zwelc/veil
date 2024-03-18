import { IPlayerSide } from "@/models/counts";
import { VisSingleContainer, VisDonut, VisTooltip } from "@unovis/react";
import { Donut } from "@unovis/ts";

export default function DonutComponent({ data }: { data: IPlayerSide[] }) {
  const triggers = {
    [Donut.selectors.segment]: (d: { data: IPlayerSide }) => d.data.name,
  };
  return (
    <VisSingleContainer data={data}>
      <VisTooltip triggers={triggers} />
      <VisDonut
        value={(d: IPlayerSide) => d.win}
        radius={120}
        centralLabel="Games Per Side"
      />
    </VisSingleContainer>
  );
}
