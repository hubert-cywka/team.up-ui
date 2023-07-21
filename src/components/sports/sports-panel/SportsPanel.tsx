import styles from './SportsPanel.module.scss';
import { useState } from 'react';
import Button from '@components/primitives/button/Button';
import classNames from 'classnames';
import { SportsPanelMode } from '@components/sports/SportShared';
import SportEditTab from '@components/sports/sport-edit-tab/SportEditTab';
import { useSession } from 'next-auth/react';
import { SportDiscipline } from '@shared/types/Sport';
import { UserRole } from '@shared/types/User.d';
import SportsList from '@components/sports/sports-list/SportsList';

interface SportsListProps {
  availableSports: SportDiscipline[];
}

const SportsPanel = ({ availableSports }: SportsListProps) => {
  const [selectedSport, setSelectedSport] = useState<SportDiscipline | null>(null);
  const [mode, setMode] = useState<SportsPanelMode>('browse');
  const isAdmin = useSession().data?.user.role === UserRole.ADMIN;

  const handleModeChange = (modeToSet: SportsPanelMode) => {
    if (modeToSet !== 'browse') {
      setSelectedSport(null);
    }
    setMode(modeToSet);
  };

  const buildSetModeButton = (modeToSet: SportsPanelMode) => {
    return (
      <Button
        variant="plain"
        className={classNames({ [styles.highlighted]: modeToSet === mode })}
        onClick={() => handleModeChange(modeToSet)}>
        {modeToSet}
      </Button>
    );
  };

  return (
    <section className={styles.sportsPanelContainer}>
      <div className={styles.headerContainer}>
        <h3 className={styles.header}>Sports</h3>
        {isAdmin && (
          <div className={styles.modeTabsContainer}>
            {buildSetModeButton('browse')}
            {buildSetModeButton('add')}
            {buildSetModeButton('edit')}
            {buildSetModeButton('delete')}
          </div>
        )}
      </div>
      <SportsList
        onChange={(sport) => setSelectedSport(sport)}
        selectedSport={selectedSport}
        availableSports={availableSports}
      />
      {isAdmin && mode !== 'browse' && (
        <SportEditTab
          mode={mode}
          sportToEdit={selectedSport}
          onSuccess={() => setSelectedSport(null)}
        />
      )}
    </section>
  );
};

export default SportsPanel;
