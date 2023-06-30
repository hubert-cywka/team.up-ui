import { PropsWithChildren } from 'react';
import styles from './MainLayout.module.scss';
import Navbar from 'components/navigation/navbar/Navbar';
import Footer from 'components/navigation/footer/Footer';
import GlobalLayout from '../GlobalLayout';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <GlobalLayout>
      <Navbar />
      <div className={styles.content}>{children}</div>
      <Footer />
    </GlobalLayout>
  );
};

export default MainLayout;
