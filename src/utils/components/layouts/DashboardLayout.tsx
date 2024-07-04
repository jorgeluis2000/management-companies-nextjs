import type React from "react";
import SidebarDesktop from "../sidebar/SidebarDesktop";
import { useCallback, useEffect, useState } from "react";
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
import type { GetStaticPropsContext } from "next";
import Footer from "../Footer";
import FooterItem from "../FooterItem";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

export default function DashboardLayout({ children, className }: IProps) {
  const { status, data } = useSession();
  const t = useTranslations("Navigation");
  const router = useRouter();
  const sizeIcon = 20;
  const { theme: _themeNow, setTheme } = useTheme();
  const [sessionUser, setSessionUser] = useState<IUserSession>();
  const [profileOp, setProfileOp] = useState<SidebarProfile>({
    name: "-",
    href: "/defaultProfile.png",
    options: (
      <div className="space-y-1">
        <Link href={`/${router.locale}/dashboard/profile`}>
          <SidebarButton
            size="sm"
            icon={<FiUser size={20} />}
            className="w-full"
          >
            {t("profile")}
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
            signOut({ redirect: true, callbackUrl: `/${router.locale}` });
          }}
          className="w-full"
        >
          {t("logout")}
        </SidebarButton>
      </div>
    ),
  });

  const [timezone, setTimezone, _removeTimezone] = useLocalStorage(
    "timezone",
    "America/Los_Angeles",
  );
  const [language, setLanguage, _removeLanguage] = useLocalStorage(
    "language",
    "en",
  );
  const [modeTheme, setModeTheme, _removeModeTheme] = useLocalStorage(
    "modeTheme",
    "system",
  );

  const [sidebarItems, setSidebarItems] = useState<SidebarItems>({
    links: [
      {
        label: t("home"),
        href: `/${router.locale}/dashboard`,
        icon: <FiHome size={sizeIcon} />,
      },
      {
        label: t("transactions"),
        href: `/${router.locale}/dashboard/transaction`,
        icon: <FiDollarSign size={sizeIcon} />,
      },
      {
        label: t("reports"),
        href: `/${router.locale}/dashboard/reports`,
        icon: <FiBarChart size={sizeIcon} />,
      },
      {
        label: t("communities"),
        href: `/${router.locale}/dashboard/communities`,
        icon: <FiUsers size={sizeIcon} />,
      },
    ],
  });

  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  const handleUnauthenticated = useCallback(() => {
    if (status === "unauthenticated") {
      router.replace(`/${router.locale}/auth/signin`);
    }
  }, [status, router]);

  const handleAuthenticated = useCallback(() => {
    if (status === "authenticated") {
      const sessionCurrent = data as IUserSession
      setSessionUser(sessionCurrent);
      setProfileOp((before) => ({
        ...before,
        name: sessionCurrent.user.name ?? " - ",
        href: sessionCurrent.user.image ?? before.href,
      }));
    }
  }, [status, data]);

  const updatePreferences = useCallback(() => {
    if (sessionUser) {
      setTimezone(sessionUser.user.timeZone ?? timezone);
      setLanguage(sessionUser.user.language?.code ?? language);
      const theme = sessionUser.user.theme?.toLowerCase();
      setModeTheme(theme ?? modeTheme.toLowerCase());
      setTheme(theme === "auto" ? "system" : theme ?? "system");
    }
  }, [sessionUser, language, modeTheme, timezone, setTimezone, setLanguage, setModeTheme, setTheme]);

  const updateSidebarItems = useCallback(() => {
    if (sessionUser && sessionUser.user.role !== "ADMIN") {
      setSidebarItems({
        links: [
          {
            label: t("home"),
            href: `/${router.locale}/dashboard`,
            icon: <FiHome size={sizeIcon} />,
          },
          {
            label: t("transactions"),
            href: `/${router.locale}/dashboard/transaction`,
            icon: <FiDollarSign size={sizeIcon} />,
          },
        ],
      });
    }
  }, [sessionUser, router, t]);

  useEffect(handleUnauthenticated, [handleUnauthenticated]);
  useEffect(handleAuthenticated, [handleAuthenticated]);
  useEffect(updatePreferences, [updatePreferences]);
  useEffect(updateSidebarItems, [updateSidebarItems]);

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
      <footer className="sm:ml-[300px] w-full">
        <Footer
          year="2024"
          by="Jorge Luis Güiza Granobles"
          description="All Rights Reserved."
        >
          <FooterItem href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
            Licensing
          </FooterItem>
        </Footer>
      </footer>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
