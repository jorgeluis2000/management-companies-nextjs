import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMutation } from "@apollo/client";
import { FiAlertOctagon, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { useEffect, useState, type FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { ADD_USER } from "../queries/UserQuery";
import type { AddUserParams } from "../domain/types/user/UserParams";
import type { TAddUser } from "../domain/types/user/User";
import type { TUserAdd } from "../domain/types/forms/UserForms";
import Required from "./Required";
import { TIMEZONE } from "@data/timezones";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LANGUAGES } from "@app/utils/constants/Languages.constants";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface IProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
}

export default function SheetAddUser({ description, title }: IProps) {
  const t = useTranslations("Community");
  const router = useRouter();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState("");
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [timezoneValue, setTimezoneValue] = useState("");
  const [addUser, { data: userAdded, error: errorAdded }] = useMutation<
    TAddUser,
    AddUserParams
  >(ADD_USER);

  function eventHandlerAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, role, email, phone, theme, password, passwordConfirm } =
      e.target as unknown as TUserAdd;
    if (password.value === passwordConfirm.value) {
      addUser({
        variables: {
          name: name.value,
          email: email.value,
          language: languageValue,
          role: role.value,
          phone: phone.value,
          theme: theme.value,
          timeZone: timezoneValue,
          password: password.value,
        },
      });
      toast(t("toasts.add.title"), {
        description: t("toasts.add.message"),
        richColors: true,
        icon: <FiCheck size={20} className="text-green-600" />,
      });
      return;
    }
    toast(t("toasts.errorAdd.title"), {
      description: t("toasts.errorAdd.message"),
      richColors: true,
      icon: <FiAlertOctagon size={20} className="text-red-600" />,
    });
  }

  useEffect(() => {
    if (errorAdded) {
      toast(errorAdded.name, {
        description: errorAdded.message,
        richColors: true,
        icon: <FiAlertOctagon size={20} className="text-red-600" />,
      });
    }
  }, [errorAdded]);

  useEffect(() => {
    if (userAdded) {
      toast(t("toasts.add.title"), {
        description: t("toasts.add.message"),
        richColors: true,
        icon: <FiCheck size={20} className="text-green-600" />,
      });
      router.reload();
    }
  }, [userAdded, router, t]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          {t("tableUser.add")}
          <FiArrowUpRight size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="space-y-5 w-full overflow-y-auto lg:min-w-[850px]"
        side={"right"}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <form className="space-y-5" onSubmit={eventHandlerAdd}>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 py-4">
            <div className="space-y-2">
              <Label htmlFor="name-user-add" className="text-right">
                {t("sheetAddUser.inputs.labelName")} <Required />
              </Label>
              <Input
                id="name-user-add"
                name="name"
                type="text"
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
                placeholder={t("sheetAddUser.inputs.placeholderEmail")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-user-add" className="text-right">
                {t("sheetAddUser.inputs.labelPhone")} <Required />
              </Label>
              <Input
                id="phone-user-add"
                name="phone"
                type="tel"
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
                placeholder={t("sheetAddUser.inputs.placeholderImage")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-transaction-add" className="text-right">
                {t("sheetAddUser.inputs.labelRole")} <Required />
              </Label>
              <Select name="role" defaultValue="ADMIN">
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
            <div className="space-y-2">
              <Label htmlFor="theme-transaction-add" className="text-right">
                {t("sheetAddUser.inputs.labelTheme")} <Required />
              </Label>
              <Select name="theme" defaultValue="AUTO">
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
            <div className="flex flex-col space-y-2">
              <Label htmlFor="timezone-transaction-add" className="text-left">
                {t("sheetAddUser.inputs.labelTimezone")} <Required />
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
                      : t("sheetAddUser.inputs.optionsTimezone.defaultValue")}
                    <HiOutlineChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder={t(
                        "sheetAddUser.inputs.optionsTimezone.search",
                      )}
                    />
                    <CommandList>
                      <CommandEmpty>
                        {t("sheetAddUser.inputs.optionsTimezone.notFound")}
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
                {t("sheetAddUser.inputs.labelLanguage")} <Required />
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
                      : t("sheetAddUser.inputs.optionsLanguage.defaultValue")}
                    <HiOutlineChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder={t(
                        "sheetAddUser.inputs.optionsLanguage.search",
                      )}
                    />
                    <CommandList>
                      <CommandEmpty>
                        {t("sheetAddUser.inputs.optionsLanguage.notFound")}
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
            <div className="space-y-2">
              <Label htmlFor="password-user-add" className="text-right">
                {t("sheetAddUser.inputs.labelPassword")} <Required />
              </Label>
              <Input
                id="password-user-add"
                name="password"
                type="password"
                placeholder={t("sheetAddUser.inputs.placeholderPassword")}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-confirm-user-add" className="text-right">
                {t("sheetAddUser.inputs.labelPasswordConfirm")} <Required />
              </Label>
              <Input
                id="password-confirm-user-add"
                name="passwordConfirm"
                type="password"
                placeholder={t(
                  "sheetAddUser.inputs.placeholderPasswordConfirm",
                )}
                className="col-span-3"
              />
            </div>
          </section>
          <section className="flex justify-start items-center gap-5">
            <SheetClose asChild>
              <Button variant={"secondary"} type="button">
                {t("sheetAddUser.btnCancel")}
              </Button>
            </SheetClose>
            <Button type="submit">{t("sheetAddUser.btnSubmit")}</Button>
          </section>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
