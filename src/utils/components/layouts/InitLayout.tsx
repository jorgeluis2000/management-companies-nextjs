import { INIT_THEME } from "@app/utils/constants/InitData.constants";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Inter } from "next/font/google";
import Router from "next/router";
import type React from "react";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import Footer from "../Footer";
import FooterItem from "../FooterItem";
const inter = Inter({ subsets: ["latin"] });

interface IProps {
  children: React.ReactNode;
}

export default function InitLayout({ children }: IProps) {
  const { status } = useSession();
  const [_timezone, setTimezone, _removeTimezone] = useLocalStorage(
    "timezone",
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [_language, setLanguage, _removeLanguage] = useLocalStorage(
    "language",
    "en",
  );
  const [_modeTheme, _setModeTheme, _removeModeTheme] = useLocalStorage(
    "modeTheme",
    "system",
  );
  const { setTheme } = useTheme();

  if (status === "authenticated") {
    Router.replace(`/${Router.locale}/dashboard`);
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      setTheme(INIT_THEME);
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      setLanguage(navigator.language);
    }
  }, [status, setTheme, setTimezone, setLanguage]);

  return (
    <>
      <div
        className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
      >
        {children}
      </div>
      <Footer
        year="2024"
        by="Jorge Luis Güiza Granobles"
        description="All Rights Reserved."
      >
        <FooterItem href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
          Licensing
        </FooterItem>
      </Footer>
    </>
  );
}
