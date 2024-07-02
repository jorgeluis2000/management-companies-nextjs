import { Head, Html, Main, NextScript } from "next/document";

import { ThemeProvider } from "./components/theme-provider";

export default function Document() {
  return (
    <Html suppressHydrationWarning lang="en">
      <Head/>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
