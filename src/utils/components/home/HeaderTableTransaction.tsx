import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

export default function HeaderTableTransaction() {
  const t = useTranslations("Dashboard");

  return (
    <TableHeader>
      <TableRow>
        <TableHead>{t("tableTransactions.columns.user")}</TableHead>
        <TableHead className="">
          {t("tableTransactions.columns.typeUser")}
        </TableHead>
        <TableHead className="">
          {t("tableTransactions.columns.typeTransaction")}
        </TableHead>
        <TableHead className="">
          {t("tableTransactions.columns.date")}
        </TableHead>
        <TableHead className="text-right">
          {t("tableTransactions.columns.amount")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
