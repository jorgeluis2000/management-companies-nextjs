import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { FiActivity } from "react-icons/fi";

interface IProps {
  value?: number;
  loading?: boolean;
}

export default function CardCountTransaction({ loading, value }: IProps) {
  const t = useTranslations("Dashboard");
  return (
    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {t("cardCountTransactions.title")}
        </CardTitle>
        <FiActivity className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">
              {t("cardCountTransactions.extra")}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
