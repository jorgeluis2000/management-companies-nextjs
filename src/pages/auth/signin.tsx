import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HRText } from "@app/utils/components/HR";
import InitLayout from "@app/utils/components/layouts/InitLayout";
import { Label } from "@radix-ui/react-label";
import type { GetStaticPropsContext, NextPage } from "next";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiAlertOctagon, FiCheck, FiLoader } from "react-icons/fi";
import { HiHome, HiOutlineArrowRight } from "react-icons/hi";
import { SiAuth0 } from "react-icons/si";
import { toast } from "sonner";

export default function SignInPage(props: NextPage) {
  const t = useTranslations("SignIn");
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  async function eventSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast("Loading", {
      richColors: true,
      icon: <FiLoader size={20} className="animate-pulse text-slate-600" />,
    });
    const response = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    if (response?.ok) {
      toast("Success", {
        richColors: true,
        icon: <FiCheck size={20} className="text-green-600" />,
      });
      router.push(`/${router.locale}/dashboard`);
    } else {
      toast("Error", {
        richColors: true,
        icon: <FiAlertOctagon size={20} className="text-red-600" />,
        description: response?.error,
      });
    }
  }

  return (
    <InitLayout>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {t("title")}
      </h5>
      <Card className="lg:min-w-96 max-w-md">
        <CardHeader />
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={eventSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="emailSignIn">{t("labelEmail")}</Label>
              </div>
              <Input
                id="emailSignIn"
                type="email"
                value={userInfo.email}
                onChange={({ target }) => {
                  setUserInfo({ ...userInfo, email: target.value });
                }}
                placeholder="name@email.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="passwordSignIn">{t("labelPassword")}</Label>
              </div>
              <Input
                id="passwordSignIn"
                type="password"
                value={userInfo.password}
                onChange={({ target }) => {
                  setUserInfo({ ...userInfo, password: target.value });
                }}
                placeholder="••••••••"
                required
              />
            </div>
            <Button className="gap-2" type="submit">
              {t("btnSignIn")}
              <HiOutlineArrowRight size={20} />
            </Button>
            <Button
              variant={"outline"}
              className="gap-2"
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                toast("Loading", {
                  richColors: true,
                  icon: (
                    <FiLoader
                      size={20}
                      className="animate-pulse text-slate-600"
                    />
                  ),
                });
                const response = await signIn("auth0", { redirect: true });
                if (response?.ok) {
                  toast("Success", {
                    richColors: true,
                    icon: <FiCheck size={20} className="text-green-600" />,
                  });
                } else {
                  toast("Error", {
                    richColors: true,
                    icon: <FiAlertOctagon size={20} className="text-red-600" />,
                    description: response?.error,
                  });
                }
              }}
            >
              {t("btnSignIn")}
              <SiAuth0 size={20} />
            </Button>
            <HRText text={t("hr")} />
            <Button
              variant="outline"
              type="button"
              className="gap-2"
              onClick={() => {
                router.replace(`/${router.locale}`);
              }}
            >
              {t("btnGoBack")}
              <HiHome size={20} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </InitLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
