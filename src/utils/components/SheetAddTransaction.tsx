import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMutation } from "@apollo/client";
import type { TypeTransaction } from "@prisma/client";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { type FormEvent, useEffect, useState } from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { toast } from "sonner";
import type { TTransactionAdd } from "../domain/types/forms/TransactionForms";
import type { TAddTransaction } from "../domain/types/transaction/Transaction";
import type { AddTransactionParams } from "../domain/types/transaction/TransactionParams";
import { ADD_TRANSACTION } from "../queries/TransactionQuery";
import Required from "./Required";

interface IProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
}

export default function SheetAddTransaction({ description, title }: IProps) {
  const t = useTranslations("Transaction");
  const router = useRouter();
  const [addTransaction, { data: transactionAdded }] = useMutation<
    TAddTransaction,
    AddTransactionParams
  >(ADD_TRANSACTION);

  async function eventHandlerAddTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { concept, type, amount } = e.target as unknown as TTransactionAdd;
    await addTransaction({
      variables: {
        amount: Number(amount.value),
        concept: concept.value,
        typeTransaction: type.value as TypeTransaction,
      },
    });
    toast(t("toasts.add.title"), {
      description: t("toasts.add.message"),
      richColors: true,
      icon: <FiCheck size={20} className="text-green-600" />,
    });
  }

  useEffect(() => {
    if (transactionAdded) {
      router.reload();
    }
  }, [transactionAdded, router]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          {t("tableTransactions.add")}
          <FiArrowUpRight size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-5" side={"right"}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <form
          className="grid gap-4 gap-y-8 py-4"
          onSubmit={eventHandlerAddTransaction}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="concept-transaction-add" className="text-right">
              <Required /> {t("sheetAddTransaction.inputs.labelConcept")}
            </Label>
            <Input
              id="concept-transaction-add"
              data-testid="concept-transaction-add"
              name="concept"
              type="text"
              placeholder={t("sheetAddTransaction.inputs.placeholderConcept")}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount-transaction-add" className="text-right">
              {t("sheetAddTransaction.inputs.labelAmount")} <Required />
            </Label>
            <Input
              id="amount-transaction-add"
              data-testid="amount-transaction-add"
              name="amount"
              type="number"
              autoComplete="off"
              placeholder={t("sheetAddTransaction.inputs.placeholderAmount")}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type-transaction-add" className="text-right">
              {t("sheetAddTransaction.inputs.labelType")} <Required />
            </Label>
            <Select name="type">
              <SelectTrigger id="type-transaction-add" data-testid="type-transaction-add" className="col-span-3">
                <SelectValue
                  placeholder={t("sheetAddTransaction.inputs.placeholderType")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {t("sheetAddTransaction.inputs.optionsType.defaultValue")}
                  </SelectLabel>
                  <SelectItem value="INCOME">
                    {t("sheetAddTransaction.inputs.optionsType.income")}
                  </SelectItem>
                  <SelectItem value="EXPENSE">
                    {t("sheetAddTransaction.inputs.optionsType.expense")}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">
                {t("sheetAddTransaction.btnSaveName")}
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
