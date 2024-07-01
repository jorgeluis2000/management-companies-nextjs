import { cn } from "@/lib/utils";

import { Inter } from "next/font/google";
import Footer from "../Footer";
import FooterItem from "../FooterItem";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { useTheme } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

interface IProps {
  children: React.ReactNode;
}

export default function InitLayout({ children }: IProps) {
  const { status } = useSession();
  const [_timezone, setTimezone, _removeTimezone] = useLocalStorage(
    "timezone",
    "America/Los_Angeles",
  );
  const [_language, setLanguage, _removeLanguage] = useLocalStorage(
    "language",
    "en",
  );
  const [modeTheme, setModeTheme, _removeModeTheme] = useLocalStorage(
    "modeTheme",
    "system",
  );
  const { setTheme } = useTheme();

  if (status === "authenticated") {
    Router.replace(`/${Router.locale}/dashboard`);
  }

  useEffect(() => {
    setLanguage(navigator.language);
  }, [setLanguage]);

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, [setTimezone]);

  useEffect(() => {
    setModeTheme("system");
    setTheme(
      modeTheme.toLowerCase() === "auto" ? "system" : modeTheme.toLowerCase(),
    );
  }, [setModeTheme, setTheme, modeTheme]);

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
