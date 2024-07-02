import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import type { TUser } from "@app/utils/domain/types/user/User";
import { format } from "@formkit/tempo";
import { BsPersonVcard } from "react-icons/bs";
import { FiCalendar, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { HiOutlineLanguage } from "react-icons/hi2";
import { IoInvertMode } from "react-icons/io5";
import { RiTimeZoneLine } from "react-icons/ri";

interface IProps {
  user: TUser;
  timezone: string | null;
}

export default function FormShowUser({ user, timezone }: IProps) {
  return (
    <section className="grid grid-cols-4">
      <Avatar className="size-20 self-center">
        <AvatarImage src={user.image ?? "/defaultProfile.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="grid grid-cols-2 content-center gap-3 gap-y-5 col-span-3">
        <div className="flex flex-row gap-2 items-center">
          <Label className="text-base">
            <BsPersonVcard size={25} />
          </Label>
          <span className="text-sm">{user.name}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label className="text-base">
            <FiMail size={25} />
          </Label>
          <span className="text-sm">{user.email}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label className="text-base">
            <FiPhone size={25} />
          </Label>
          <span className="text-sm">{user.phone ?? " - "}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label className="text-base">
            <FiUser size={25} />
          </Label>
          <span className="text-sm">{user.role}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label className="text-base">
            <FiCalendar size={25} />
          </Label>
          <span className="text-sm">
            {format({
              date: user.createdAt,
              format: "DD/MM/YYYY",
              tz: timezone ?? "America/Bogota",
            })}
          </span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label className="text-base">
            <HiOutlineLanguage size={25} />
          </Label>
          <span className="text-sm">{user.userConfig.language.name}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label className="text-base">
            <IoInvertMode size={25} />
          </Label>
          <span className="text-sm">{user.userConfig.theme}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label className="text-base">
            <RiTimeZoneLine size={25} />
          </Label>
          <span className="text-sm">{user.userConfig.timeZone.zone}</span>
        </div>
      </div>
    </section>
  );
}
