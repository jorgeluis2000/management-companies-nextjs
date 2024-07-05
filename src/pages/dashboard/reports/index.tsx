import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useLazyQuery, useQuery } from "@apollo/client";
import DownloadCSV from "@app/utils/components/DownloadCVS";
import Required from "@app/utils/components/Required";
import DashboardLayout from "@app/utils/components/layouts/DashboardLayout";
import TransactionByDateChart from "@app/utils/components/reports/TransactionByDateChart";
import type {
  TCountTransactions,
  TCurrentBalanceTransaction,
  TGetChartData,
  TTransactionCSV,
} from "@app/utils/domain/types/transaction/Transaction";
import type {
  CountTransactionsParams,
  CurrentBalanceTransactionParams,
  GetChartDataParams,
} from "@app/utils/domain/types/transaction/TransactionParams";
import {
  COUNT_TRANSACTIONS,
  CURRENT_BALANCE_TRANSACTION,
  GET_CHART_DATA_TRANSACTION,
} from "@app/utils/queries/TransactionQuery";
import { date, format } from "@formkit/tempo";
import type { TypeTransaction } from "@prisma/client";
import { subDays } from "date-fns";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import React from "react";
import { useEffect, useState } from "react";
import { FiActivity, FiDollarSign } from "react-icons/fi";
import { PiFileCsvFill } from "react-icons/pi";

export default function ReportsPage() {
  const t = useTranslations("Report");
  const limitRows = 1000;

  const [typeTransaction, setTypeTransaction] =
    useState<TypeTransaction>("INCOME");

  const fields = ["amount", "createdAt", "userEmail", "userName", "userRole"];

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, _setEndDate] = useState<Date | null>(null);
  const [dataDownload, setDataDownload] = useState<TTransactionCSV[]>([]);

  const [loadBalance, { loading: balanceLoading, data: balance }] =
    useLazyQuery<TCurrentBalanceTransaction, CurrentBalanceTransactionParams>(
      CURRENT_BALANCE_TRANSACTION,
    );

  const [loadGetChart, { loading: _dataChartLoading, data: dataChart }] =
    useLazyQuery<TGetChartData, GetChartDataParams>(GET_CHART_DATA_TRANSACTION);

  const [
    loadCountTransaction,
    { loading: countTransactionLoading, data: countTransaction },
  ] = useLazyQuery<TCountTransactions, CountTransactionsParams>(
    COUNT_TRANSACTIONS,
  );

  useEffect(() => {
    const fetchData = async () => {
      await loadBalance();
      await loadGetChart({
        variables: {
          limit: limitRows,
          page: 1,
          typeTransaction: typeTransaction,
          createdAfter: startDate,
          createdBefore: endDate,
        },
      });
      await loadCountTransaction({
        variables: {
          typeTransaction: typeTransaction,
        },
      });
    };
    fetchData();
  }, [
    loadCountTransaction,
    loadBalance,
    loadGetChart,
    startDate,
    endDate,
    typeTransaction,
  ]);

  useEffect(() => {
    if (dataChart) {
      const cleanedData: TTransactionCSV[] = dataChart.getChartData.map(
        ({ user, ...rest }) => ({
          ...rest,
          userEmail: user.email,
          userName: user.name,
          userRole: user.role,
        }),
      );
      setDataDownload(cleanedData);
    }
  }, [dataChart]);

  return (
    <DashboardLayout className="space-y-5">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
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
                <div className="text-2xl font-bold">
                  {countTransaction?.countTransactions}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("cardCountTransactions.extra")}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeader>
            <section className="flex gap-4 justify-between items-center">
              <CardTitle>{t("title")}</CardTitle>
              <DownloadCSV
                className="gap-4"
                btnName={
                  <>
                    {t("btnDownload")}
                    <PiFileCsvFill size={25} />
                  </>
                }
                data={dataDownload}
                fields={fields}
              />
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type-transaction" className="text-right">
                  {t("inputs.labelTime")} <Required />
                </Label>
                <Select
                  onValueChange={(value) => {
                    if (value === "last_7_days") {
                      setStartDate(subDays(new Date(), 6));
                    } else if (value === "last_30_days") {
                      setStartDate(subDays(new Date(), 29));
                    } else if (value === "all_time") {
                      setStartDate(null);
                    } else if (value === "today") {
                      const myTime = new Date();
                      setStartDate(date(format(myTime, "YYYY-MM-DD")));
                    }
                  }}
                  defaultValue="all_time"
                  name="type"
                >
                  <SelectTrigger id="type-transaction" className="col-span-3">
                    <SelectValue placeholder={t("inputs.placeholderTime")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {t("inputs.optionsTime.defaultValue")}
                      </SelectLabel>
                      <SelectItem value="today">
                        {t("inputs.optionsTime.today")}
                      </SelectItem>
                      <SelectItem value="last_7_days">
                        {t("inputs.optionsTime.last_7_days")}
                      </SelectItem>
                      <SelectItem value="last_30_days">
                        {t("inputs.optionsTime.last_30_days")}
                      </SelectItem>
                      <SelectItem value="all_time">
                        {t("inputs.optionsTime.all_time")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type-transaction" className="text-right">
                  {t("inputs.labelType")} <Required />
                </Label>
                <Select
                  onValueChange={(value) => {
                    setTypeTransaction(value as TypeTransaction);
                  }}
                  value={typeTransaction}
                  name="type"
                >
                  <SelectTrigger id="type-transaction" className="col-span-3">
                    <SelectValue placeholder={t("inputs.placeholderType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {t("inputs.optionsType.defaultValue")}
                      </SelectLabel>
                      <SelectItem value="INCOME">
                        {t("inputs.optionsType.income")}
                      </SelectItem>
                      <SelectItem value="EXPENSE">
                        {t("inputs.optionsType.expense")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </section>
          </CardHeader>
          <CardContent>
            {dataChart ? (
              <TransactionByDateChart
                nameLine={typeTransaction.toLowerCase()}
                data={dataChart?.getChartData}
              />
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
