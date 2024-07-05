import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function CardHeaderTransition() {
  const t = useTranslations("Dashboard");

  return (
    <CardHeader className="flex flex-row items-center">
      <div className="grid gap-2">
        <CardTitle>{t("tableTransactions.title")}</CardTitle>
        <CardDescription>{t("tableTransactions.summary")}</CardDescription>
      </div>
      <Button asChild size="sm" className="ml-auto gap-1">
        <Link href="/dashboard/transaction">
          {t("tableTransactions.more")}
          <FiArrowUpRight size={16} />
        </Link>
      </Button>
    </CardHeader>
  );
}
