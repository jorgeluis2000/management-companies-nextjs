import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
const inter = Inter({ subsets: ["latin"] });

export default function NotFound() {
  const t = useTranslations("NotFound");
  const { locale } = useRouter();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>
              {t("title")}: {t("code")}
            </h1>
          </CardTitle>
          <CardDescription>
            <p>{t("message")}</p>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={`/${locale}`}>{t("link")}</Link>
        </CardFooter>
      </Card>
    </main>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
