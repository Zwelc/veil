import { IBaseCount } from "@/models/counts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function StackedBarComponent(props: { data: IBaseCount[] }) {
  const data: IBaseCount[] = props.data;

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <Bar dataKey="win" fill="var(--color-chart-1" radius={4} />
        <Bar dataKey="games" fill="var(--color-chart-2)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
