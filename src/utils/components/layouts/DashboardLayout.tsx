import type React from "react";
import SidebarDesktop from "../sidebar/SidebarDesktop";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import {
  FiHome,
  FiBarChart,
  FiUsers,
  FiDollarSign,
  FiUser,
  FiLogOut,
  FiMeh,
} from "react-icons/fi";
import type {
  SidebarItems,
  SidebarProfile,
} from "@app/utils/domain/interfaces/Sidebar";
import SidebarButton from "../sidebar/SidebarButton";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import Link from "next/link";
import type { IUserSession } from "@app/utils/domain/types/user/UserSession";
import SidebarMobile from "../sidebar/SidebarMobile";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { toast } from "sonner";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

export default function DashboardLayout({ children, className }: IProps) {
  const { status, data } = useSession();
  const { setTheme } = useTheme();
  const [sessionUser, setSessionUser] = useState<IUserSession>();
  const [profileOp, setProfileOp] = useState<SidebarProfile>({
    name: "-",
    href: "https://github.com/max-programming.png",
    options: (
      <div className="space-y-1">
        <Link href="/dashboard/profile">
          <SidebarButton
            size="sm"
            icon={<FiUser size={20} />}
            className="w-full"
          >
            Account Settings
          </SidebarButton>
        </Link>
        <SidebarButton
          size="sm"
          icon={<FiLogOut size={20} />}
          onClick={() => {
            toast("Go back soon", {
              richColors: true,
              icon: <FiMeh size={20} className="text-amber-600" />,
            });
            signOut();
          }}
          className="w-full"
        >
          Log Out
        </SidebarButton>
      </div>
    ),
  });

  const [_timezone, setTimezone, _removeTimezone] = useLocalStorage(
    "timezone",
    "America/Los_Angeles",
  );
  const [_language, setLanguage, _removeLanguage] = useLocalStorage(
    "language",
    "en",
  );
  const [_modeTheme, setModeTheme, _removeModeTheme] = useLocalStorage(
    "modeTheme",
    "auto",
  );
  const t = useTranslations();
  const router = useRouter();

  const sizeIcon = 20;
  const sidebarItems: SidebarItems = {
    links: [
      {
        label: "Home",
        href: `/${router.locale}/dashboard`,
        icon: <FiHome size={sizeIcon} />,
      },
      {
        label: "Transactions",
        href: `/${router.locale}/dashboard/transaction`,
        icon: <FiDollarSign size={sizeIcon} />,
      },
      {
        label: "Reports",
        href: `/${router.locale}/dashboard/reports`,
        icon: <FiBarChart size={sizeIcon} />,
      },
      {
        href: "/dashboard/communities",
        icon: <FiUsers size={sizeIcon} />,
        label: "Communities",
      },
    ],
  };

  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace(`/${Router.locale}/auth/signin`);
    }
    if (status === "authenticated") {
      setSessionUser(data as IUserSession);
      setProfileOp((before) => ({
        ...before,
        name: sessionUser?.user.name ?? " - ",
        href: sessionUser?.user.image ?? before.href,
      }));
    }
  }, [status, setSessionUser, setProfileOp, sessionUser]);

  useEffect(() => {
    if (sessionUser) {
      setTimezone((beforeTimezone) =>
        sessionUser?.user?.timeZone
          ? sessionUser.user.timeZone
          : beforeTimezone,
      );
      setLanguage((beforeLanguage) =>
        sessionUser?.user?.language
          ? sessionUser.user.language
          : beforeLanguage,
      );
      setModeTheme((beforeModeTheme) =>
        sessionUser?.user?.theme
          ? sessionUser.user.theme.toLowerCase()
          : beforeModeTheme.toLowerCase(),
      );
      setTheme(sessionUser.user.theme?.toLocaleUpperCase() ?? "auto");
    }
  }, [sessionUser, setTimezone, setLanguage, setModeTheme, setTheme]);

  return (
    <>
      {isDesktop ? (
        <SidebarDesktop
          title={<img src="/vercel.svg" className="size-24" alt="Logo" />}
          profile={profileOp}
          sidebarItems={sidebarItems}
        />
      ) : (
        <SidebarMobile
          title={<img src="/vercel.svg" className="size-24" alt="Logo" />}
          profile={profileOp}
          sidebarItems={sidebarItems}
        />
      )}
      <div
        className={`min-h-screen px-2 sm:mx-5 mt-16 sm:ml-[300px] sm:mt-3 ${className}`}
      >
        {children}
      </div>
    </>
  );
}
