import { SportDisciplineHydration, SportDisciplineStore } from '@stores/SportDisciplinesStore';
import { UserDetailsHydration, UserDetailsStore } from '@stores/UserDetailsStore';

export type RootStoreHydration = {
  sportDisciplineStore?: SportDisciplineHydration;
  userDetailsStore?: UserDetailsHydration;
};

export class RootStore {
  sportDisciplineStore: SportDisciplineStore;
  userDetailsStore: UserDetailsStore;

  constructor() {
    this.sportDisciplineStore = new SportDisciplineStore(this);
    this.userDetailsStore = new UserDetailsStore(this);
  }

  hydrate(data: RootStoreHydration) {
    if (data.sportDisciplineStore) {
      this.sportDisciplineStore.hydrate(data.sportDisciplineStore);
    }

    if (data.userDetailsStore) {
      this.userDetailsStore.hydrate(data.userDetailsStore);
    }
  }
}
