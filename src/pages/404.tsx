import React from "react";
import { Inter } from "next/font/google";
import { useTranslations } from 'next-intl';
import type { GetStaticPropsContext } from 'next';
import Link from "next/link";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function NotFound() {
    const t = useTranslations('NotFound');
    const { locale } = useRouter()
    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <h1>{t('title')}: {t('code')}</h1>
            <p>{t('message')}</p>
            <Link href={`/${locale}`}>{t('link')}</Link>
        </main>
    )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../messages/${locale}.json`)).default
        }
    };
}