import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import SkeletonTable from "../SkeletonTable";
import type { TTransaction } from "@app/utils/domain/types/transaction/Transaction";
import RowTransaction from "./RowTransaction";
interface IProps {
  loading?: boolean;
  value?: TTransaction[];
}
export default function BodyTableTransaction({ loading, value }: IProps) {
  if (loading) {
    return (
      <TableBody>
        <SkeletonTable repeatColumn={5} repeatRow={5} />
      </TableBody>
    );
  }

  if (value && value.length > 0) {
    return (
      <TableBody>
        {value.map((transaction) => (
          <RowTransaction transaction={transaction} key={transaction.id} />
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody>
      <TableRow>
        <TableCell>...</TableCell>
      </TableRow>
    </TableBody>
  );
}
