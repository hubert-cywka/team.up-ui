'use client';

import styles from './HeartMonitor.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { getRandomIntegerInRange } from '@shared/utility/NumberUtils';

const HeartMonitor = () => {
  const MIN_RATE = 105;
  const MAX_RATE = 160;
  const MAX_CHANGE = 10;
  const INTERVAL = 550;
  const MIN_GRAPH_HEIGHT = 30;
  const GRAPH_HEIGHT_DIFF = 20;
  const DASHES_MULTIPLIER = 0.1;
  const BASE_WIDTH = 180;
  const [rate, setRate] = useState(MIN_RATE);
  const intervalRef = useRef<typeof setInterval.prototype.return | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dashesCount, setDashesCount] = useState(0);

  useEffect(() => {
    const containerWidth = containerRef.current?.clientWidth;
    if (containerWidth) {
      setDashesCount(Math.floor((containerWidth - BASE_WIDTH) * DASHES_MULTIPLIER));
    }
  }, [containerRef.current?.clientWidth]);

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
    const dashes: ReactNode[] = [];
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
    return dashes;
  };

  return (
    <div ref={containerRef} className={styles.heartMonitor}>
      <FontAwesomeIcon icon={faHeart} className={styles.heartbeatIcon} />
      <span className={styles.heartbeatRate}>{rate} BPM</span>
      <span className={styles.chartContainer}>{buildChart(dashesCount)}</span>
    </div>
  );
};

export default HeartMonitor;
