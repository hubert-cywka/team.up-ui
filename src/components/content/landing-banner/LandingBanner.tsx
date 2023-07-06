import styles from './LandingBanner.module.scss';
import Image from 'next/image';
import { FOOTBALL_DARK_IMG } from 'shared/constants/ImageConstants';
import HeartMonitor from 'components/content/landing-banner/heart-monitor/HeartMonitor';

const LandingBanner = () => {
  return (
    <article className={styles.landingBanner}>
      <h2 className={styles.header}>Be active now. Team up for free.</h2>
      <section className={styles.content}>
        <section className={styles.imageContainer}>
          <Image src={FOOTBALL_DARK_IMG.src} alt={FOOTBALL_DARK_IMG.alt} fill priority={true} />
        </section>
        <p className={styles.slogan}>
          Improve your <b>fitness</b> level for the better. For <b>fun!</b>
        </p>
      </section>
      <HeartMonitor />
    </article>
  );
};

export default LandingBanner;
