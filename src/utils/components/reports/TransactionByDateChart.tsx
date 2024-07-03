import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TransactionByDateChart() {
  const data = [
    { value: 12, date: "2024-12-12" },
    { value: 24, date: "2024-12-11" },
  ];
  return (
    <ResponsiveContainer width={"100%"} minHeight={300}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" name="Date" />
        <YAxis tickFormatter={tick => (`\$${tick}`)} />
        <Tooltip formatter={value => (`\$${value}`)} />
        <Legend />
        <Line type="monotone" dataKey="value" name="Balance" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
