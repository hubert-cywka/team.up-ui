import { PropsWithChildren } from 'react';
import styles from './MainLayout.module.scss';
import PageNavbar from 'components/navigation/page-navbar/PageNavbar';
import Footer from 'components/navigation/footer/Footer';
import GlobalLayout from '../GlobalLayout';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <GlobalLayout>
      <PageNavbar />
      <div className={styles.content}>{children}</div>
      <Footer />
    </GlobalLayout>
  );
};

export default MainLayout;
