import { IPatch } from "@/models/counts";
import { VisXYContainer, VisStackedBar, VisAxis } from "@unovis/react";

export default function StackedBarComponent(props: { data: IPatch[] }) {
  const data: IPatch[] = props.data;
  const x = (d: IPatch, i: number) => i;
  const y = [(d: IPatch) => d.games, (d: IPatch) => d.win];

  return (
    <VisXYContainer data={data} height={"24rem"}>
      <VisStackedBar
        x={x}
        y={y}
        roundedCorners={4}
        barPadding={0.15}
        color={["hsl(var(--primary))", "hsl(var(--muted))"]}
      />
      <VisAxis
        type="x"
        numTicks={data.length}
        color={["hsl(var(--text))"]}
        gridLine={false}
      />
      <VisAxis
        type="y"
        numTicks={data.length}
        color={["hsl(var(--text))"]}
        gridLine={false}
      />
    </VisXYContainer>
  );
}
