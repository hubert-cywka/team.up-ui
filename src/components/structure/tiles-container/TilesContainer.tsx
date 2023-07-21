import Tile, { TileProps } from '@components/structure/tile/Tile';
import styles from './TilesContainer.module.scss';
import { memo } from 'react';

interface TilesContainerProps {
  tiles: TileProps[];
}

const TilesContainer = ({ tiles }: TilesContainerProps) => {
  return (
    <section className={styles.tilesContainer}>
      {tiles.map((tile) => (
        <Tile key={tile.step} {...tile} />
      ))}
    </section>
  );
};

export default memo(TilesContainer);
