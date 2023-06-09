import styles from './Tile.module.scss';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface TileProps {
  header: string;
  text: string;
  icon: IconDefinition;
  step?: number;
}

const Tile = ({ header, text, icon, step }: TileProps) => {
  return (
    <div className={styles.tileContainer}>
      <FontAwesomeIcon className={styles.icon} icon={icon} />
      <div className={styles.header}>{header}</div>
      <div className={styles.description}>{text}</div>
      {step !== undefined && <div className={styles.step}>{step}</div>}
    </div>
  );
};

export default Tile;
