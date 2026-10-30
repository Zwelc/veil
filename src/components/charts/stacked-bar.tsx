import { IBaseCount } from "@/models/counts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function StackedBarComponent(props: { data: IBaseCount[] }) {
  const data = props.data.map((entry) => ({
    ...entry,
    losses: Math.max(0, entry.games - entry.win),
  }));

  const chartConfig = {
    win: {
      label: "Wins",
      color: "var(--color-chart-2)",
    },
    losses: {
      label: "Losses",
      color: "var(--color-muted-foreground)",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig} className="min-h-[260px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ top: 12, right: 12, left: -18, bottom: 0 }}
      >
        <CartesianGrid
          vertical={false}
          stroke="var(--color-border)"
          strokeDasharray="4 4"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
        />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          interval="preserveStartEnd"
        />
        <Tooltip
          cursor={{ fill: "var(--color-muted)", opacity: 0.35 }}
          contentStyle={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
            color: "var(--color-popover-foreground)",
          }}
          formatter={(value, name) => [
            value,
            name === "win" ? "Wins" : "Losses",
          ]}
        />
        <Legend verticalAlign="top" align="right" height={32} />
        <Bar
          dataKey="win"
          name="Wins"
          stackId="matches"
          fill="var(--color-chart-2)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="losses"
          name="Losses"
          stackId="matches"
          fill="var(--color-muted-foreground)"
          fillOpacity={0.35}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
