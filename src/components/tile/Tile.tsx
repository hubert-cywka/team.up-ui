import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import styles from './Tile.module.scss';

interface TileProps {
  header: string;
  text: string;
  icon: ReactJSXElement;
}

const Tile = ({ header, text, icon }: TileProps) => {
  return (
    <div className={styles['tile-container']}>
      <div className={styles['icon-container']}>{icon}</div>
      <div className={styles['header']}>{header}</div>
      <div className={styles['description']}>{text}</div>
    </div>
  );
};

export default Tile;
