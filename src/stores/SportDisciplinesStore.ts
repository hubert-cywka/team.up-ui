import { action, makeObservable, observable } from 'mobx';
import { RootStore } from './RootStore';
import { SportDiscipline } from '@shared/types/Sport';
import { useRootStore } from '@providers/RootStoreProvider';

export type SportDisciplineHydration = {
  sport: SportDiscipline | null;
};

export function useSportDisciplineStore() {
  const { sportDisciplineStore } = useRootStore();
  return sportDisciplineStore;
}

export class SportDisciplineStore {
  root: RootStore;
  sport: SportDiscipline | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      select: action,
      sport: observable
    });
  }

  select(sport: SportDiscipline | null) {
    this.sport = sport;
  }

  hydrate(data?: SportDisciplineHydration) {
    if (data) {
      this.sport = data.sport;
    }
  }
}
