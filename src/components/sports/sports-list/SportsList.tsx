import { SportDiscipline } from 'shared/interfaces/SportDiscipline';
import SportTile from 'components/sports/sport-tile/SportTile';
import styles from './SportsList.module.scss';
import { useState } from 'react';
import Button from '../../primitives/button/Button';
import classNames from 'classnames';
import { SportsListMode } from '../SportShared';
import SportEditPanel from '../sport-edit-panel/SportEditPanel';

interface SportsListProps {
  sports: SportDiscipline[];
}

const SportsList = ({ sports }: SportsListProps) => {
  const [selectedSports, setSelectedSports] = useState<SportDiscipline[]>([]);
  const [mode, setMode] = useState<SportsListMode>('browse');
  const isAdmin = true;

  const clearSelectedSports = () => {
    setSelectedSports([]);
  };

  const isSelected = (sport: SportDiscipline) => {
    return selectedSports.indexOf(sport) !== -1;
  };

  const handleSelection = (sport: SportDiscipline) => {
    if (isSelected(sport)) {
      const indexToRemove = selectedSports.indexOf(sport);
      const newSelectedSports = Array.from(selectedSports);
      newSelectedSports.splice(indexToRemove, 1);
      setSelectedSports(newSelectedSports);
    } else {
      const newSelectedSports =
        mode === 'browse' ? [...Array.from(selectedSports), sport] : [sport];
      setSelectedSports(newSelectedSports);
    }
  };

  const buildSportTiles = () => {
    return sports.map((sport) => (
      <SportTile
        onClick={() => handleSelection(sport)}
        highlighted={isSelected(sport)}
        key={sport._id}
        sport={sport}
      />
    ));
  };

  const handleModeChange = (modeToSet: SportsListMode) => {
    if (modeToSet !== 'browse') {
      clearSelectedSports();
    }
    setMode(modeToSet);
  };

  const buildSetModeButton = (modeToSet: SportsListMode) => {
    return (
      <Button
        variant="plain"
        className={classNames({ [styles.highlighted]: modeToSet === mode })}
        onClick={() => handleModeChange(modeToSet)}>
        {modeToSet}
      </Button>
    );
  };

  const buildModeSelector = () => {
    if (isAdmin) {
      return (
        <div className={styles.modeTabsContainer}>
          {buildSetModeButton('browse')}
          {buildSetModeButton('add')}
          {buildSetModeButton('edit')}
          {buildSetModeButton('delete')}
        </div>
      );
    }
  };

  return (
    <div className={styles.sportsListContainer}>
      <div className={styles.headerContainer}>
        <h3 className={styles.header}>Sports</h3>
        {buildModeSelector()}
      </div>
      <section className={styles.sportsList}>
        {!sports.length ? 'No sport disciplines to show.' : buildSportTiles()}
      </section>
      {isAdmin && mode !== 'browse' && (
        <SportEditPanel
          mode={mode}
          sportToEdit={selectedSports[0]}
          onSuccess={clearSelectedSports}
        />
      )}
    </div>
  );
};

export default SportsList;
