import { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/reset.scss';
import 'styles/globals.scss';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { QueryClientProvider } from 'react-query';
import { AppQueryClient } from 'services/QueryClient';
import { SessionProvider } from 'next-auth/react';
import GlobalLayout from '@layouts/GlobalLayout';
import { RootStoreProvider } from '@providers/RootStoreProvider';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Team.Up</title>
        <link href="/favicon.svg" rel="icon" type="image/svg" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={AppQueryClient}>
          <RootStoreProvider hydrationData={pageProps.hydrationData}>
            <GlobalLayout>
              <Component {...pageProps} />
            </GlobalLayout>
          </RootStoreProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
