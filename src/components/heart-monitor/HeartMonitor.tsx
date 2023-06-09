'use client';

import styles from './HeartMonitor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useEffect, useRef, useState } from 'react';
import { getRandomIntegerInRange } from 'utility/utility/NumberUtils';

const MIN_RATE = 105;
const MAX_RATE = 160;
const MAX_CHANGE = 10;
const INTERVAL = 750;
const MIN_GRAPH_HEIGHT = 30;
const GRAPH_HEIGHT_DIFF = 20;
const DASHES_COUNT = 15;

const HeartMonitor = () => {
  const [rate, setRate] = useState(MIN_RATE);
  const intervalRef = useRef<typeof setInterval.prototype.return | null>(null);

  useEffect(() => {
    const minRate = Math.max(rate - MAX_CHANGE, MIN_RATE);
    const maxRate = Math.min(rate + MAX_CHANGE, MAX_RATE);

    intervalRef.current = setInterval(
      () => setRate(getRandomIntegerInRange(minRate, maxRate)),
      INTERVAL
    );

    return () => clearInterval(intervalRef.current);
  }, [rate]);

  const buildChart = (count: number) => {
    const dashes: ReactJSXElement[] = [];
    const rateBonus = ((rate - MIN_RATE) / (MAX_RATE - MIN_RATE)) * GRAPH_HEIGHT_DIFF;
    for (let dashesCreated = 0; dashesCreated < count; dashesCreated++) {
      dashes.push(
        <div
          key={dashesCreated}
          className={styles.dash}
          style={{
            height: `${getRandomIntegerInRange(
              MIN_GRAPH_HEIGHT + rateBonus,
              100 - GRAPH_HEIGHT_DIFF + rateBonus
            )}%`
          }}
        />
      );
    }
    return dashes.map((dash) => dash);
  };

  return (
    <div className={styles.heartMonitor}>
      <FontAwesomeIcon icon={faHeart} className={styles.heartbeatIcon} />
      <div className={styles.heartbeatRate}>{rate} BPM</div>
      <div className={styles.chartContainer}>{buildChart(DASHES_COUNT)}</div>
    </div>
  );
};

export default HeartMonitor;
