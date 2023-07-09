import styles from './SportTile.module.scss';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { SportDiscipline } from 'shared/types/Sport';

interface SportTileProps extends ComponentProps<'div'> {
  sport: SportDiscipline;
  highlighted?: boolean;
}

const SportTile = ({ sport, highlighted, onClick }: SportTileProps) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles.sportTile, { [styles.highlighted]: highlighted })}>
      {sport.name}
    </div>
  );
};

export default SportTile;
