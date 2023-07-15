import { PropsWithChildren } from 'react';
import styles from './CenteredLayout.module.scss';
import Navbar from 'components/navigation/navbar/Navbar';
import Footer from 'components/navigation/footer/Footer';

const CenteredLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <div className={styles.content}>{children}</div>
      <Footer />
    </>
  );
};

export default CenteredLayout;
