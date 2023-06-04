import '../styles/globals.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/utility/Theme';
import { AppProps } from 'next/app';
import PageNavbar from '@/components/page-navbar/PageNavbar';
import Layout from '@/pages/layout';
import Footer from '@/components/footer/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <div className="content-container">
          <PageNavbar />
          <Component {...pageProps} />
        </div>
        <Footer />
      </ThemeProvider>
    </Layout>
  );
}

export default MyApp;
