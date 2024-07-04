import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLazyQuery, useQuery } from "@apollo/client";
import DashboardLayout from "@app/utils/components/layouts/DashboardLayout";
import SkeletonTable from "@app/utils/components/SkeletonTable";
import type {
  TCountTransactions,
  TCurrentBalanceTransaction,
  TListTransaction,
} from "@app/utils/domain/types/transaction/Transaction";
import type {
  CurrentBalanceTransactionParams,
  ListTransactionsParams,
} from "@app/utils/domain/types/transaction/TransactionParams";
import {
  COUNT_TRANSACTIONS,
  CURRENT_BALANCE_TRANSACTION,
  GET_TRANSACTIONS,
} from "@app/utils/queries/TransactionQuery";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";
import {
  FiActivity,
  FiAlertOctagon,
  FiArrowUpRight,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";
import { toast } from "sonner";
import { format } from "@formkit/tempo";
import { useReadLocalStorage } from "usehooks-ts";
import { COUNT_USER } from "@app/utils/queries/UserQuery";
import type { TCurrentCountUsers } from "@app/utils/domain/types/user/User";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const timezone = useReadLocalStorage<string>("timezone");
  const {
    error: transactionsError,
    loading: transactionsLoading,
    data: transactions,
  } = useQuery<TListTransaction, ListTransactionsParams>(GET_TRANSACTIONS, {
    variables: { page: 1, limit: 5 },
  });

  const {
    error: _countTransactionError,
    loading: countTransactionLoading,
    data: countTransaction
  } = useQuery<TCountTransactions, ListTransactionsParams>(COUNT_TRANSACTIONS)

  const {
    error: balanceError,
    loading: balanceLoading,
    data: balance,
  } = useQuery<TCurrentBalanceTransaction, CurrentBalanceTransactionParams>(
    CURRENT_BALANCE_TRANSACTION,
  );

  const { error: _countUsersError, loading: countUsersLoading, data: countUsers } = useQuery<TCurrentCountUsers>(COUNT_USER)

  const expense = "border-red-500 text-red-700 bg-red-200/50 dark:bg-red-300";
  const income = "border-green-500 text-green-700 bg-green-200/50 dark:bg-green-300";
  // useEffect(() => {
  //   if (transactionsError) {
  //     toast(transactionsError.name, {
  //       richColors: true,
  //       icon: <FiAlertOctagon size={20} className="text-red-600" />,
  //       description: transactionsError.message,
  //     });
  //   }
  //   if (balanceError) {
  //     toast(balanceError.name, {
  //       richColors: true,
  //       icon: <FiAlertOctagon size={20} className="text-red-600" />,
  //       description: balanceError.message,
  //     });
  //   }
  // }, [transactionsError, balanceError]);
  return (
    <DashboardLayout className="space-y-5">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cardBalance.title")}
            </CardTitle>
            <FiDollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {balanceLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  ${balance?.currentBalance}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("cardBalance.extra")}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cardCountUsers.title")}
            </CardTitle>
            <FiUsers className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {countUsersLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{countUsers?.countUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {t("cardCountUsers.extra")}
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("cardCountTransactions.title")}
            </CardTitle>
            <FiActivity className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {countTransactionLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{countTransaction?.countTransactions}</div>
                <p className="text-xs text-muted-foreground">
                  {t("cardCountTransactions.extra")}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 md:gap-8 lg:grid-cols-1">
        <Card className="md:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>{t("tableTransactions.title")}</CardTitle>
              <CardDescription>
                {t("tableTransactions.summary")}
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/dashboard/transaction">
                {t("tableTransactions.more")}
                <FiArrowUpRight size={16} />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
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
              <TableBody>
                {transactionsLoading ? (
                  <SkeletonTable repeatColumn={5} repeatRow={5} />
                ) : (
                  transactions?.transactions.map((transaction, key) => (
                    <TableRow key={key.toString()}>
                      <TableCell>
                        <div className="font-medium">
                          {transaction.user.name}
                        </div>
                        <div className="text-sm text-muted-foreground md:inline">
                          {transaction.user.email}
                        </div>
                      </TableCell>
                      <TableCell className="table-cell">
                        {transaction.user.role}
                      </TableCell>
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
                      <TableCell className="text-right">
                        ${transaction.amount}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
