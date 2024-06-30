import { ThemeModeScript } from "flowbite-react";
import { Head, Html, Main, NextScript } from "next/document";

import { ThemeProvider } from "./components/theme-provider";

export default function Document() {
  return (
    <Html suppressHydrationWarning lang="en">
      <Head>
        <ThemeModeScript />
      </Head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Main />
        </ThemeProvider>
        <NextScript />
      </body>
    </Html>
  );
}
