import { PropsWithChildren } from 'react';
import styles from './CenteredLayout.module.scss';
import Navbar from 'components/navigation/navbar/Navbar';
import Footer from 'components/navigation/footer/Footer';
import GlobalLayout from '../GlobalLayout';

const CenteredLayout = ({ children }: PropsWithChildren) => {
  return (
    <GlobalLayout>
      <Navbar />
      <div className={styles.content}>{children}</div>
      <Footer />
    </GlobalLayout>
  );
};

export default CenteredLayout;
