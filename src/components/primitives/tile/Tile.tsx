import styles from './Tile.module.scss';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

export interface TileProps {
  header: string;
  text: string;
  icon: IconDefinition;
  step?: number;
}

const Tile = ({ header, text, icon, step }: TileProps) => {
  return (
    <article className={styles.tileContainer}>
      <FontAwesomeIcon className={styles.icon} icon={icon} />
      <h2 className={styles.header}>{header}</h2>
      <p className={styles.description}>{text}</p>
      {step !== undefined && <p className={styles.step}>{step}</p>}
    </article>
  );
};

export default memo(Tile);
