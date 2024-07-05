import type { TTransactionChart } from "@app/utils/domain/types/transaction/Transaction";
import { format } from "@formkit/tempo";
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
import { useReadLocalStorage } from "usehooks-ts";

interface IProps {
  data: TTransactionChart[];
  nameLine: string;
}

export default function TransactionByDateChart({ data, nameLine }: IProps) {
  const timezone = useReadLocalStorage<string>("timezone");

  return (
    <ResponsiveContainer width={"100%"} minHeight={300}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          tickFormatter={(tick) =>
            format({
              date: tick,
              format: "DD/MM/YYYY hh:mm a",
              tz: timezone ?? "America/Bogota",
            })
          }
          dataKey="createdAt"
          name="Date"
        />
        <YAxis name="Amount" tickFormatter={(tick) => `\$${tick}`} />
        <Tooltip formatter={(value) => `\$${value}`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          name={nameLine}
          stroke="#8884d8"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
