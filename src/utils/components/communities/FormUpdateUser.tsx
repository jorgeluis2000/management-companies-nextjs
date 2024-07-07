import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import Required from "@app/utils/components/Required";
import type { TUserUpdate } from "@app/utils/domain/types/forms/UserForms";
import type { TUpdateUser, TUser } from "@app/utils/domain/types/user/User";
import type { UpdateUserParams } from "@app/utils/domain/types/user/UserParams";
import { UPDATE_USER } from "@app/utils/queries/UserQuery";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiAlertOctagon, FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";

interface IProps {
  user: TUser;
}

export default function FormUpdateUser({ user }: IProps) {
  const t = useTranslations("Community");
  const router = useRouter();
  const [updateUser, { data: userUpdated, error: userUpdatedError }] =
    useMutation<TUpdateUser, UpdateUserParams>(UPDATE_USER);
  async function eventSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { id, name, role } = e.target as unknown as TUserUpdate;

    await updateUser({
      variables: {
        id: id.value,
        name: name.value,
        role: role.value,
      },
    });

    toast(t("toasts.loading.title"), {
      description: t("toasts.loading.message"),
      richColors: true,
      icon: <FiLoader size={20} className="text-green-600 animate-pulse" />,
    });
  }

  useEffect(() => {
    if (userUpdated) {
      toast(t("toasts.update.title"), {
        description: t("toasts.update.message"),
        richColors: true,
        icon: <FiCheck size={20} className="text-green-600" />,
      });
      router.reload();
    }
  }, [userUpdated, router, t]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (userUpdatedError) {
      toast(t("toasts.errorUpdate.title"), {
        description: t("toasts.errorUpdate.message"),
        richColors: true,
        icon: <FiAlertOctagon size={20} className="text-red-600" />,
      });
      router.reload();
    }
  }, [userUpdatedError]);

  return (
    <form onSubmit={eventSubmit} className="space-y-5">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 py-4">
        <div className="space-y-2">
          <Label htmlFor="name-user-add" className="text-right">
            {t("dialogUpdateUser.inputs.labelName")} <Required />
          </Label>
          <Input
            id="name-user-add"
            name="name"
            defaultValue={user.name}
            type="text"
            placeholder={t("dialogUpdateUser.inputs.placeholderName")}
            className="col-span-3"
          />
        </div>
        <div className="hidden space-y-2">
          <Label htmlFor="id-user-update" className="text-right">
            id <Required />
          </Label>
          <Input
            id="id-user-update"
            name="id"
            value={user.id}
            type="text"
            className="col-span-3"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role-transaction-add" className="text-right">
            {t("dialogUpdateUser.inputs.labelRole")} <Required />
          </Label>
          <Select name="role" defaultValue={user.role}>
            <SelectTrigger id="role-transaction-add" className="col-span-3">
              <SelectValue
                placeholder={t("dialogUpdateUser.inputs.placeholderRole")}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  {t("dialogUpdateUser.inputs.optionsRole.defaultValue")}
                </SelectLabel>
                <SelectItem value="ADMIN">
                  {t("dialogUpdateUser.inputs.optionsRole.admin")}
                </SelectItem>
                <SelectItem value="USER">
                  {t("dialogUpdateUser.inputs.optionsRole.user")}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="flex justify-start gap-4 items-center">
        <DialogClose asChild>
          <Button variant={"secondary"} type="button">
            {t("dialogUpdateUser.btnCancel")}
          </Button>
        </DialogClose>
        <Button type="submit">{t("dialogUpdateUser.btnSubmit")}</Button>
      </section>
    </form>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
