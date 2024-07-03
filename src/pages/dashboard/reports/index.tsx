import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@apollo/client";
import DashboardLayout from "@app/utils/components/layouts/DashboardLayout";
import type { TCurrentBalanceTransaction } from "@app/utils/domain/types/transaction/Transaction";
import type { CurrentBalanceTransactionParams } from "@app/utils/domain/types/transaction/TransactionParams";
import { CURRENT_BALANCE_TRANSACTION } from "@app/utils/queries/TransactionQuery";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { FiDollarSign } from "react-icons/fi";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TransactionByDateChart from "../../../utils/components/reports/TransactionByDateChart";

export default function ProfilePage() {
  const t = useTranslations("Report");
  const {
    error: _balanceError,
    loading: balanceLoading,
    data: balance,
  } = useQuery<TCurrentBalanceTransaction, CurrentBalanceTransactionParams>(
    CURRENT_BALANCE_TRANSACTION,
  );

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
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Total Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionByDateChart />
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
