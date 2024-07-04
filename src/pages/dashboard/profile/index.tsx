import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@apollo/client";
import DashboardLayout from "@app/utils/components/layouts/DashboardLayout";
import Required from "@app/utils/components/Required";
import { LANGUAGES } from "@app/utils/constants/Languages.constants";
import type { TUserEditProfile } from "@app/utils/domain/types/forms/UserForms";
import type { TUpdateUser } from "@app/utils/domain/types/user/User";
import type { UpdateUserProfileParams } from "@app/utils/domain/types/user/UserParams";
import type { IUserSession } from "@app/utils/domain/types/user/UserSession";
import { UPDATE_USER_PROFILE } from "@app/utils/queries/UserQuery";
import { TIMEZONE } from "@data/timezones";
import type { Role, UserTheme } from "@prisma/client";
import type { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { HiOutlineChevronUpDown } from "react-icons/hi2";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const router = useRouter();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState("");
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [timezoneValue, setTimezoneValue] = useState("");
  const [roleValue, setRoleValue] = useState<Role>("ADMIN");
  const [themeValue, setThemeValue] = useState<UserTheme>("AUTO");
  const {
    status,
    data: currentSession,
    update: updateMySession,
  } = useSession();
  const [sessionUser, setSessionUser] = useState<IUserSession>();

  const [updateProfile, _result] = useMutation<
    TUpdateUser,
    UpdateUserProfileParams
  >(UPDATE_USER_PROFILE);

  async function eventHandlerSubmit(e: React.FormEvent<HTMLFormElement>) {
    const { name, email, phone, image } =
      e.target as unknown as TUserEditProfile;

    await updateProfile({
      variables: {
        name: name.value,
        email: email.value,
        phone: phone.value,
        image: image?.value,
        role: roleValue,
        language: languageValue,
        theme: themeValue,
        timeZone: timezoneValue,
      },
    });

    await updateMySession({
      ...currentSession,
      user: {
        ...currentSession?.user,
        email: name.value,
        name: name.value,
        phone: phone.value,
        image: image?.value ?? "",
        role: roleValue,
        language: languageValue,
        theme: themeValue,
        timeZone: timezoneValue,
      },
    });
    router.reload()
  }

  useEffect(() => {
    if (status === "authenticated") {
      const authUserSession = currentSession as IUserSession;
      setSessionUser(authUserSession);
      setLanguageValue(authUserSession.user.language?.code ?? "es");
      setTimezoneValue(authUserSession.user.timeZone ?? "America/Bogota");
      setRoleValue(authUserSession.user.role ?? "USER");
      setThemeValue(authUserSession.user.theme ?? "AUTO");
    }
  }, [status, currentSession]);
  return (
    <DashboardLayout>
      <form className="flex flex-col gap-5" onSubmit={eventHandlerSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>
              {t("title")} {sessionUser?.user.name}
            </CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 py-4">
            <div className="space-y-2">
              <Label htmlFor="name-user-add" className="text-right">
                {t("cardEdit.inputs.labelName")} <Required />
              </Label>
              <Input
                id="name-user-add"
                name="name"
                type="text"
                defaultValue={sessionUser?.user.name}
                placeholder={t("cardEdit.inputs.placeholderName")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-user-add" className="text-right">
                {t("cardEdit.inputs.labelEmail")} <Required />
              </Label>
              <Input
                id="email-user-add"
                name="email"
                type="email"
                defaultValue={sessionUser?.user.email}
                placeholder={t("cardEdit.inputs.placeholderEmail")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-user-add" className="text-right">
                {t("cardEdit.inputs.labelPhone")}
              </Label>
              <Input
                id="phone-user-add"
                name="phone"
                type="tel"
                defaultValue={sessionUser?.user?.phone ?? ""}
                placeholder={t("cardEdit.inputs.placeholderPhone")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-user-add" className="text-right">
                {t("cardEdit.inputs.labelImage")}
              </Label>
              <Input
                id="image-user-add"
                name="image"
                type="url"
                defaultValue={sessionUser?.user?.image ?? ""}
                placeholder={t("cardEdit.inputs.placeholderImage")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-transaction-add" className="text-right">
                {t("cardEdit.inputs.labelRole")} <Required />
              </Label>
              <Select
                name="role"
                value={roleValue}
                onValueChange={(value) => {
                  setRoleValue(value as Role);
                }}
              >
                <SelectTrigger id="role-transaction-add" className="col-span-3">
                  <SelectValue
                    placeholder={t("cardEdit.inputs.placeholderRole")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {t("cardEdit.inputs.optionsRole.defaultValue")}
                    </SelectLabel>
                    <SelectItem value="ADMIN">
                      {t("cardEdit.inputs.optionsRole.admin")}
                    </SelectItem>
                    <SelectItem value="USER">
                      {t("cardEdit.inputs.optionsRole.user")}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 py-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="theme-transaction-add" className="text-left">
                {t("cardEdit.inputs.labelTheme")} <Required />
              </Label>
              <Select
                name="theme"
                value={themeValue}
                onValueChange={(value) => {
                  setThemeValue(value as UserTheme);
                }}
              >
                <SelectTrigger
                  id="theme-transaction-add"
                  className="col-span-3"
                >
                  <SelectValue
                    placeholder={t("cardEdit.inputs.placeholderTheme")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {t("cardEdit.inputs.optionsTheme.defaultValue")}
                    </SelectLabel>
                    <SelectItem value="DARK">
                      {t("cardEdit.inputs.optionsTheme.dark")}
                    </SelectItem>
                    <SelectItem value="LIGHT">
                      {t("cardEdit.inputs.optionsTheme.light")}
                    </SelectItem>
                    <SelectItem value="AUTO">
                      {t("cardEdit.inputs.optionsTheme.auto")}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="timezone-transaction-add" className="text-left">
                {t("cardEdit.inputs.labelTimezone")} <Required />
              </Label>
              <Popover open={timezoneOpen} onOpenChange={setTimezoneOpen}>
                <PopoverTrigger asChild>
                  <Button
                    role="combobox"
                    aria-expanded={timezoneOpen}
                    className="min-w-[200px] justify-between"
                    variant={"outline"}
                  >
                    {timezoneValue
                      ? TIMEZONE.find(
                          (timezone) => timezone.zone === timezoneValue,
                        )?.zone
                      : t("cardEdit.inputs.optionsTimezone.defaultValue")}
                    <HiOutlineChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder={t("cardEdit.inputs.optionsTimezone.search")}
                    />
                    <CommandList>
                      <CommandEmpty>
                        {t("cardEdit.inputs.optionsTimezone.notFound")}
                      </CommandEmpty>
                      <CommandGroup>
                        {TIMEZONE.map((timezone, index) => (
                          <CommandItem
                            key={index.toString()}
                            value={timezone.zone}
                            onSelect={(currentValue) => {
                              setTimezoneValue(
                                currentValue === timezoneValue
                                  ? ""
                                  : currentValue,
                              );
                              setTimezoneOpen(false);
                            }}
                          >
                            <FiCheck
                              className={`mr-2 h-4 w-4 ${timezoneValue === timezone.zone ? "opacity-100" : "opacity-0"}`}
                            />
                            {timezone.zone} {timezone.utcOffset}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="language-transaction-add" className="text-left">
                {t("cardEdit.inputs.labelLanguage")} <Required />
              </Label>
              <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
                <PopoverTrigger asChild>
                  <Button
                    role="combobox"
                    aria-expanded={languageOpen}
                    className="min-w-[200px] justify-between"
                    variant={"outline"}
                  >
                    {languageValue
                      ? LANGUAGES.find(
                          (language) => language.code === languageValue,
                        )?.name
                      : t("cardEdit.inputs.optionsLanguage.defaultValue")}
                    <HiOutlineChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder={t("cardEdit.inputs.optionsLanguage.search")}
                    />
                    <CommandList>
                      <CommandEmpty>
                        {t("cardEdit.inputs.optionsLanguage.notFound")}
                      </CommandEmpty>
                      <CommandGroup>
                        {LANGUAGES.map((language, index) => (
                          <CommandItem
                            key={index.toString()}
                            value={language.code}
                            onSelect={(currentValue) => {
                              setLanguageValue(
                                currentValue === languageValue
                                  ? ""
                                  : currentValue,
                              );
                              setLanguageOpen(false);
                            }}
                          >
                            <FiCheck
                              className={`mr-2 h-4 w-4 ${languageValue === language.code ? "opacity-100" : "opacity-0"}`}
                            />
                            {language.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex justify-left items-center p-5 w-full gap-4">
            <Button
              variant={"secondary"}
              type="button"
              onClick={() => {
                router.push(`/${router.locale}/dashboard`);
              }}
            >
              {t("btnCancel")}
            </Button>
            <Button type="submit">{t("btnSubmit")}</Button>
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
