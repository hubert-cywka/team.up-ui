import '../styles/globals.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/utility/Theme';
import { AppProps } from 'next/app';
import PageNavbar from '@/components/page-navbar/PageNavbar';
import Layout from '@/pages/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <PageNavbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  );
}

export default MyApp;
