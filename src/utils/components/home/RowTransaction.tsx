import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { TTransaction } from "@app/utils/domain/types/transaction/Transaction";
import { format } from "@formkit/tempo";
import React from "react";
import { useReadLocalStorage } from "usehooks-ts";

interface IProps {
  transaction: TTransaction;
}

export default function RowTransaction({ transaction }: IProps) {
  const expense = "border-red-500 text-red-700 bg-red-200/50 dark:bg-red-300";
  const income =
    "border-green-500 text-green-700 bg-green-200/50 dark:bg-green-300";
  const timezone = useReadLocalStorage<string>("timezone");

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{transaction.user.name}</div>
        <div className="text-sm text-muted-foreground md:inline">
          {transaction.user.email}
        </div>
      </TableCell>
      <TableCell className="table-cell">{transaction.user.role}</TableCell>
      <TableCell className="table-cell">
        <Badge
          className={`text-xs ${transaction.typeTransaction === "EXPENSE" ? expense : income}`}
          variant="outline"
        >
          {transaction.typeTransaction}
        </Badge>
      </TableCell>
      <TableCell className="table-cell">
        {format({
          date: transaction.createdAt,
          format: "DD/MM/YYYY hh:mm a",
          tz: timezone ?? "America/Bogota",
        })}
      </TableCell>
      <TableCell className="text-right">${transaction.amount}</TableCell>
    </TableRow>
  );
}
