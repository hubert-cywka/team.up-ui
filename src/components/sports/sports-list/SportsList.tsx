import styles from './SportsList.module.scss';
import SportTile from 'components/sports/sport-tile/SportTile';
import { SportDiscipline } from 'shared/types/Sport';
import { ComponentProps } from 'react';
import classNames from 'classnames';

interface SportsListProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  onChange: (sport: SportDiscipline | null) => void; // eslint-disable-line no-unused-vars
  availableSports: SportDiscipline[];
  selectedSport: SportDiscipline | null;
}

const SportsList = ({ onChange, availableSports, selectedSport, className }: SportsListProps) => {
  const isSelected = (sport: SportDiscipline) => {
    return selectedSport?._id === sport._id;
  };

  const handleSelection = (sport: SportDiscipline) => {
    if (isSelected(sport)) {
      onChange(null);
    } else {
      onChange(sport);
    }
  };

  return (
    <section className={classNames(styles.sportsList, className)}>
      {!availableSports.length
        ? 'No sport disciplines to show.'
        : availableSports.map((sport) => (
            <SportTile
              onClick={() => handleSelection(sport)}
              highlighted={isSelected(sport)}
              key={sport._id}
              sport={sport}
            />
          ))}
    </section>
  );
};

export default SportsList;
