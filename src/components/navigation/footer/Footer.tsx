import styles from './Footer.module.scss';
import Link from 'next/link';
import { PORTFOLIO_URL } from 'constants/URLConstants';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <Link href={PORTFOLIO_URL} className={styles.author}>
        Hubert Cywka, 2023
      </Link>
    </div>
  );
};

export default Footer;
