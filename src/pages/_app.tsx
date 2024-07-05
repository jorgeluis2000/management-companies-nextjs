import "@app/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { useRouter } from "next/router";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "../utils/components/theme-provider";
import React from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const clientApollo = new ApolloClient({
  uri: "/api/graphql",
  credentials: "same-origin",
  cache: new InMemoryCache(),
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <div
        className={`bg-background font-sans antialiased overflow-x-hidden ${fontSans.className}`}
      >
        <SessionProvider session={pageProps.session}>
          <ApolloProvider client={clientApollo}>
            <NextIntlClientProvider
              locale={router.locale}
              timeZone="America/Bogota"
              messages={pageProps.messages}
            >
              <Toaster
                position="top-right"
                duration={3000}
                closeButton
                pauseWhenPageIsHidden
              />
              <Component {...pageProps} />
            </NextIntlClientProvider>
          </ApolloProvider>
        </SessionProvider>
      </div>
    </ThemeProvider>
  );
}
