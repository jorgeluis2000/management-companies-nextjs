import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Required from "@app/utils/components/Required";
import type { TUser } from "@app/utils/domain/types/user/User";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";
import { toast } from "sonner";

interface IProps {
  user: TUser;
}

export default function FormUpdateUser({ user }: IProps) {
  const t = useTranslations("Community");

  function eventSubmit(e: React.FormEvent<HTMLFormElement>) {
    toast(t("toasts.add.title"), {
      description: t("toasts.add.message"),
      richColors: true,
      icon: <FiCheck size={20} className="text-green-600" />,
    });
  }

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8 py-4">
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
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`))
        .default,
    },
  };
}
