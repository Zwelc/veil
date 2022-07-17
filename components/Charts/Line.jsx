import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useCounts } from "../../hooks/usePlayer";
import Spinner from "../spinner";

function SimpleLineChart({ id }) {
  const { data, isLoading } = useCounts(id);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <Line
          dataKey="games"
          stackId="a"
          stroke="#a78bfa"
          activeDot={{ r: 8 }}
        />
        <Line dataKey="win" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export { SimpleLineChart };
