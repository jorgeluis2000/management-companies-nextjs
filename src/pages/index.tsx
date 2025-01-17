import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { HRTrimmed } from "@app/utils/components/HR";
import InitLayout from "@app/utils/components/layouts/InitLayout";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import React from "react";

export default function HomePage() {
  const t = useTranslations("Home");
  const router = useRouter();

  return (
    <InitLayout>
      <Card className="max-w-sm">
        <CardHeader>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("welcome")}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {t("description")}
          </p>
        </CardHeader>
        <CardContent>
          <HRTrimmed />
        </CardContent>
        <CardFooter className="justify-center items-center">
          <Button
            color="cyan"
            onClick={() => {
              router.push(`/${router.locale}/auth/signin`);
            }}
          >
            {t("btnLogin")}
          </Button>
        </CardFooter>
      </Card>
    </InitLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
