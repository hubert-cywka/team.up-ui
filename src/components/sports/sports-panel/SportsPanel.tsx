'use client';

import styles from './SportsPanel.module.scss';
import { useState } from 'react';
import Button from '@components/primitives/button/Button';
import classNames from 'classnames';
import { SportsPanelMode } from '@components/sports/SportShared';
import SportEditTab from '@components/sports/sport-panel-tabs/sport-edit-tab/SportEditTab';
import { SportDiscipline } from '@shared/types/Sport';
import { UserRole } from '@shared/types/User.d';
import SportsList from '@components/sports/sports-list/SportsList';
import { useAuthSession } from '@shared/hooks/auth/useAuthSession';
import { observer } from 'mobx-react-lite';
import { useSportDisciplineStore } from '@stores/SportDisciplinesStore';
import SportAddTab from '@components/sports/sport-panel-tabs/sport-add-tab/SportAddTab';
import SportDeleteTab from '@components/sports/sport-panel-tabs/sport-delete-tab/SportDeleteTab';

interface SportsListProps {
  availableSports: SportDiscipline[];
}

const SportsPanel = observer(({ availableSports }: SportsListProps) => {
  const [mode, setMode] = useState<SportsPanelMode>('browse');
  const store = useSportDisciplineStore();
  const isAdmin = useAuthSession().user?.role === UserRole.ADMIN;

  const handleModeChange = (modeToSet: SportsPanelMode) => {
    if (modeToSet !== 'browse') {
      store.select(null);
    }
    setMode(modeToSet);
  };

  const buildSetModeButton = (modeToSet: SportsPanelMode) => {
    return (
      <Button
        variant="plain"
        className={classNames(styles.tab, { [styles.highlighted]: modeToSet === mode })}
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
        onChange={(sport) => store.select(sport)}
        selectedSport={store.sport}
        availableSports={availableSports}
      />

      {isAdmin && mode === 'add' && <SportAddTab />}
      {isAdmin && mode === 'delete' && (
        <SportDeleteTab sportToDelete={store.sport} onSuccess={() => store.select(null)} />
      )}
      {isAdmin && mode === 'edit' && (
        <SportEditTab sportToEdit={store.sport} onSuccess={() => store.select(null)} />
      )}
    </section>
  );
});

export default SportsPanel;
