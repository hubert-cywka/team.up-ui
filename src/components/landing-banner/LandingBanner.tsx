import styles from './LandingBanner.module.scss';
import Image from 'next/image';
import { FOOTBALL_DARK_IMG } from '@/constants/ImageConstants';
import HeartMonitor from '@/components/heart-monitor/HeartMonitor';

const LandingBanner = () => {
  return (
    <div className={styles['landing-banner']}>
      <div className={styles['header']}>Be active now. Team up for free.</div>
      <div className={styles['content']}>
        <div className={styles['image-container']}>
          <Image src={FOOTBALL_DARK_IMG.src} alt={FOOTBALL_DARK_IMG.alt} fill priority={true} />
        </div>
        <div className={styles['slogan']}>
          Improve your <b>fitness</b> level for the better. For <b>fun!</b>
        </div>
      </div>
      <HeartMonitor />
    </div>
  );
};

export default LandingBanner;
