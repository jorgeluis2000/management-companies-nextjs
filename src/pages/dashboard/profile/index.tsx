import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@app/utils/components/layouts/DashboardLayout";
import Required from "@app/utils/components/Required";
import type { IUserSession } from "@app/utils/domain/types/user/UserSession";
import type { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const router = useRouter();
  const { status, data: currentSession } = useSession();
  const [sessionUser, setSessionUser] = useState<IUserSession>();
  useEffect(() => {
    if (status === "authenticated") {
      setSessionUser(currentSession as IUserSession);
    }
  }, [status, currentSession]);
  return (
    <DashboardLayout>
      <form className="flex flex-col gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Perfil de {sessionUser?.user.name}</CardTitle>
            <CardDescription>Modifica y personaliza tu perfil sin inconvenientes.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 py-4">
          <div className="space-y-2">
              <Label htmlFor="name-user-add" className="text-right">
                {t("sheetAddUser.inputs.labelName")} <Required />
              </Label>
              <Input
                id="name-user-add"
                name="name"
                type="text"
                defaultValue={sessionUser?.user.name}
                placeholder={t("sheetAddUser.inputs.placeholderName")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-user-add" className="text-right">
                {t("sheetAddUser.inputs.labelEmail")} <Required />
              </Label>
              <Input
                id="email-user-add"
                name="email"
                type="email"
                defaultValue={sessionUser?.user.email}
                placeholder={t("sheetAddUser.inputs.placeholderEmail")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-user-add" className="text-right">
                {t("sheetAddUser.inputs.labelPhone")}
              </Label>
              <Input
                id="phone-user-add"
                name="phone"
                type="tel"
                defaultValue={sessionUser?.user?.phone ?? ""}
                placeholder={t("sheetAddUser.inputs.placeholderPhone")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-user-add" className="text-right">
                {t("sheetAddUser.inputs.labelImage")}
              </Label>
              <Input
                id="image-user-add"
                name="image"
                type="url"
                defaultValue={sessionUser?.user?.image ?? ""}
                placeholder={t("sheetAddUser.inputs.placeholderImage")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-transaction-add" className="text-right">
                {t("sheetAddUser.inputs.labelRole")} <Required />
              </Label>
              <Select name="role" defaultValue={sessionUser?.user.role}>
                <SelectTrigger id="role-transaction-add" className="col-span-3">
                  <SelectValue
                    placeholder={t("sheetAddUser.inputs.placeholderRole")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {t("sheetAddUser.inputs.optionsRole.defaultValue")}
                    </SelectLabel>
                    <SelectItem value="ADMIN">
                      {t("sheetAddUser.inputs.optionsRole.admin")}
                    </SelectItem>
                    <SelectItem value="USER">
                      {t("sheetAddUser.inputs.optionsRole.user")}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 py-4">
          <div className="space-y-2">
              <Label htmlFor="theme-transaction-add" className="text-right">
                {t("sheetAddUser.inputs.labelTheme")} <Required />
              </Label>
              <Select name="theme" defaultValue={sessionUser?.user.theme}>
                <SelectTrigger
                  id="theme-transaction-add"
                  className="col-span-3"
                >
                  <SelectValue
                    placeholder={t("sheetAddUser.inputs.placeholderTheme")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {t("sheetAddUser.inputs.optionsTheme.defaultValue")}
                    </SelectLabel>
                    <SelectItem value="DARK">
                      {t("sheetAddUser.inputs.optionsTheme.dark")}
                    </SelectItem>
                    <SelectItem value="LIGHT">
                      {t("sheetAddUser.inputs.optionsTheme.light")}
                    </SelectItem>
                    <SelectItem value="AUTO">
                      {t("sheetAddUser.inputs.optionsTheme.auto")}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </form>
    </DashboardLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
