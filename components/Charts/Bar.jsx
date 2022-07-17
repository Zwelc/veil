import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useCounts } from "../../hooks/usePlayer";
import Spinner from "../spinner";
function StackedBarChart({ id }) {
  const { data, isLoading } = useCounts(id);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data.patch}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="games" stackId="a" fill="#a78bfa" />
        <Bar dataKey="win" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export { StackedBarChart };
