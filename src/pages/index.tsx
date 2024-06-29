import { Inter } from "next/font/google";
import { useTranslations } from 'next-intl';
import type { GetStaticPropsContext } from 'next';
import { useRouter } from "next/router";
import { Button, Card, Footer, HR } from "flowbite-react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const t = useTranslations('Home');
  const router = useRouter()

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}>

      <Card
        className="max-w-sm"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{t('welcome')}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{t('description')}</p>
        <HR.Trimmed />
        <Button gradientMonochrome="cyan" onClick={() => {
          router.push(`/${router.locale}/auth/signin`)
        }}>
          {t('btnLogin')}
        </Button>
      </Card>
    </div>
  );
}


export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}