import { PropsWithChildren } from 'react';
import styles from './MainLayout.module.scss';
import Navbar from 'components/structure/navbar/Navbar';
import Footer from 'components/structure/footer/Footer';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <div className={styles.content}>{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
