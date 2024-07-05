import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { FiDollarSign } from "react-icons/fi";

interface IProps {
  value?: number;
  loading?: boolean;
}

export default function CardAmount({ value, loading }: IProps) {
  const t = useTranslations("Dashboard");

  if (loading) {
    return (
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("cardBalance.title")}
          </CardTitle>
          <FiDollarSign className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {t("cardBalance.title")}
        </CardTitle>
        <FiDollarSign className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <>
          <div className="text-2xl font-bold">${value}</div>
          <p className="text-xs text-muted-foreground">
            {t("cardBalance.extra")}
          </p>
        </>
      </CardContent>
    </Card>
  );
}
