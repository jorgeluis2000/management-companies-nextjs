import DashboardLayout from "@app/utils/components/layouts/DashboardLayout";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
//   const t = useTranslations("Report");
  return <DashboardLayout className="space-y-5">Report</DashboardLayout>;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
