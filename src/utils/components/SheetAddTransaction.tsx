import { Button } from "@/components/ui/button";
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
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { ADD_TRANSACTION } from "../queries/TransactionQuery";
import type { TAddTransaction } from "../domain/types/transaction/Transaction";
import type { AddTransactionParams } from "../domain/types/transaction/TransactionParams";
import { useState, type FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "next/router";
import type { TTransactionAdd } from "../domain/types/forms/TransactionForms";
import type { TypeTransaction } from "@prisma/client";

interface IProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
}

export default function SheetAddTransaction({ description, title }: IProps) {
  const t = useTranslations("Transaction");
  const router = useRouter();
  const [addTransaction, transactionAdded] = useMutation<
    TAddTransaction,
    AddTransactionParams
  >(ADD_TRANSACTION);

  function eventHandlerAddTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { concept, type, amount } = e.target as unknown as TTransactionAdd;
    addTransaction({
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
    // router.reload();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          agregar
          <FiArrowUpRight size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={eventHandlerAddTransaction}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="concept-transaction-add" className="text-right">
              Concept
            </Label>
            <Input
              id="concept-transaction-add"
              name="concept"
              type="text"
              placeholder="Car payment..."
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount-transaction-add" className="text-right">
              Amount
            </Label>
            <Input
              id="amount-transaction-add"
              name="amount"
              type="number"
              placeholder="Amount of payment"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type-transaction-add" className="text-right">
              Type
            </Label>
            <Select name="type">
              <SelectTrigger id="type-transaction-add" className="col-span-3">
                <SelectValue placeholder="Select type transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type transaction</SelectLabel>
                  <SelectItem value="INCOME">Income</SelectItem>
                  <SelectItem value="EXPENSE">Expense</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
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
