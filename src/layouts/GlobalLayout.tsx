import { Lexend } from 'next/font/google';
import { PropsWithChildren } from 'react';
import styles from './GlobalLayout.module.scss';

const lexend = Lexend({ subsets: ['latin'] });

const GlobalLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={lexend.className}>
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default GlobalLayout;
