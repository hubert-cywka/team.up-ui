import styles from './Footer.module.scss';
import Link from 'next/link';
import { PORTFOLIO_URL } from 'constants/URLConstants';
import { memo } from 'react';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <Link href={PORTFOLIO_URL} className={styles.author}>
        Hubert Cywka, 2023
      </Link>
    </footer>
  );
};

export default memo(Footer);
