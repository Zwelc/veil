import { IPatch } from "@/models/counts";
import { VisXYContainer, VisStackedBar, VisAxis } from "@unovis/react";

export default function StackedBarComponent(props: { data: IPatch[] }) {
  const data: IPatch[] = props.data;
  const x = (d: IPatch, i: number) => i;
  const y = [(d: IPatch) => d.games, (d: IPatch) => d.win];

  return (
    <VisXYContainer
      data={data}
      height={"16rem"}
      // sizing="fill"
      // className="w-full h-full"
    >
      <VisStackedBar
        x={x}
        y={y}
        roundedCorners={4}
        barPadding={0.15}
        color={["#41b883", "#72D0A6"]}
      />
      <VisAxis
        type="x"
        tickFormat={(tick, i: number) => data[i]?.name}
        numTicks={data.length}
        color="#888888"
      />
      <VisAxis
        type="y"
        // tickFormat={(tick, i: number) => data[i]?.win}
        numTicks={data.length}
        color="#888888"
      />
    </VisXYContainer>
  );
}
