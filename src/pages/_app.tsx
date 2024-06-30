import "@app/styles/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app";
import { DarkThemeToggle, Flowbite, Footer, useThemeMode } from "flowbite-react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { useEffect } from "react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const deviceTheme = useThemeMode()
  const clientApollo = new ApolloClient({
    uri: "/api/graphql",
    credentials: "same-origin",
    cache: new InMemoryCache()
  })
  useEffect(() => {
    deviceTheme.setMode('light')
  }, [deviceTheme])
  return (
    <Flowbite>
      <SessionProvider session={pageProps.session}>
        <ApolloProvider client={clientApollo}>
          <NextIntlClientProvider
            locale={router.locale}
            timeZone="America/Bogota"
            messages={pageProps.messages}
          >
            <Component {...pageProps} />
            <Footer container>
              <Footer.Copyright by="Jorge Luis Güiza Granobles" about="is licensed under Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International" year={2024} rel="license noopener noreferrer" href="https://github.com/jorgeluis2000/management-companies-nextjs" />
            </Footer>
          </NextIntlClientProvider>
        </ApolloProvider>
      </SessionProvider>
      {/* <DarkThemeToggle /> */}
    </Flowbite>
  );
}
