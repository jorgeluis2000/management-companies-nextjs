import "@app/styles/globals.css";
import { cn } from "@/lib/utils";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { useRouter } from "next/router";
import Footer from "../utils/components/Footer";
import FooterItem from "../utils/components/FooterItem";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const clientApollo = new ApolloClient({
    uri: "/api/graphql",
    credentials: "same-origin",
    cache: new InMemoryCache(),
  });

  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
      )}
    >
      <SessionProvider session={pageProps.session}>
        <ApolloProvider client={clientApollo}>
          <NextIntlClientProvider
            locale={router.locale}
            timeZone="America/Bogota"
            messages={pageProps.messages}
          >
            <Component {...pageProps} />
            <Footer
              year="2024"
              by="Jorge Luis Güiza Granobles"
              description="All Rights Reserved."
            >
              <FooterItem href="https://github.com/jorgeluis2000/management-companies-nextjs">
                Licensing
              </FooterItem>
            </Footer>
          </NextIntlClientProvider>
        </ApolloProvider>
      </SessionProvider>
    </div>
  );
}
