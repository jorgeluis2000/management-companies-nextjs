import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import DashboardLayout from "@app/utils/components/layouts/DashboardLayout";
import type { GetStaticPropsContext } from "next";
import CardAmount from "@app/utils/components/home/CardAmount";
import CardUsers from "@app/utils/components/home/CardUsers";
import CardCountTransaction from "@app/utils/components/home/CardCountTransaction";
import HeaderTableTransaction from "@app/utils/components/home/HeaderTableTransaction";
import CardHeaderTransition from "@app/utils/components/home/CardHeaderTransaction";
import BodyTableTransaction from "@app/utils/components/home/BodyTableTransaction";
import { useLazyQuery } from "@apollo/client";
import {
  COUNT_TRANSACTIONS,
  CURRENT_BALANCE_TRANSACTION,
  GET_TRANSACTIONS,
} from "@app/utils/queries/TransactionQuery";
import type {
  TCountTransactions,
  TCurrentBalanceTransaction,
  TListTransaction,
} from "@app/utils/domain/types/transaction/Transaction";
import type {
  CurrentBalanceTransactionParams,
  ListTransactionsParams,
} from "@app/utils/domain/types/transaction/TransactionParams";
import type { TCurrentCountUsers } from "@app/utils/domain/types/user/User";
import { COUNT_USER } from "@app/utils/queries/UserQuery";

export default function DashboardPage() {
  const [loadBalance, { loading: balanceLoading, data: balance }] =
    useLazyQuery<TCurrentBalanceTransaction, CurrentBalanceTransactionParams>(
      CURRENT_BALANCE_TRANSACTION,
    );
  const [loadCountUsers, { loading: countUsersLoading, data: countUsers }] =
    useLazyQuery<TCurrentCountUsers>(COUNT_USER);

  const [
    loadCountTransaction,
    { loading: countTransactionLoading, data: countTransaction },
  ] = useLazyQuery<TCountTransactions, ListTransactionsParams>(
    COUNT_TRANSACTIONS,
  );

  const [
    loadTransactions,
    { loading: transactionsLoading, data: transactions },
  ] = useLazyQuery<TListTransaction, ListTransactionsParams>(GET_TRANSACTIONS);

  useEffect(() => {
    const fetchData = async () => {
      await loadBalance();
      await loadCountUsers();
      await loadCountTransaction();
      await loadTransactions({
        variables: { page: 1, limit: 5 },
      });
    };
    fetchData();
  }, [loadBalance, loadCountUsers, loadCountTransaction, loadTransactions]);

  return (
    <DashboardLayout className="space-y-5">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <CardAmount loading={balanceLoading} value={balance?.currentBalance} />
        <CardUsers loading={countUsersLoading} value={countUsers?.countUsers} />
        <CardCountTransaction
          loading={countTransactionLoading}
          value={countTransaction?.countTransactions}
        />
      </section>
      <section className="grid gap-4 md:gap-8 lg:grid-cols-1">
        <Card className="md:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeaderTransition />
          <CardContent>
            <Table>
              <HeaderTableTransaction />
              <BodyTableTransaction
                loading={transactionsLoading}
                value={transactions?.transactions}
              />
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
