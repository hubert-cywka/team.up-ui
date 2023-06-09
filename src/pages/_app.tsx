import { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/globals.scss';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Team.Up</title>
        <link href="/favicon.svg" rel="icon" type="image/svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
