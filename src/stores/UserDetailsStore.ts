import { action, makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from './RootStore';
import { GeoPosition } from '@shared/types/Other';
import { useRootStore } from '@providers/RootStoreProvider';

export type UserDetailsHydration = {
  userLocation: GeoPosition | null;
};

export function useUserDetailsStore() {
  const { userDetailsStore } = useRootStore();
  return userDetailsStore;
}

export class UserDetailsStore {
  root: RootStore;
  userLocation: GeoPosition | null = null;

  constructor(root: RootStore) {
    this.root = root;

    makeObservable(this, {
      locate: action,
      initialLocate: action,
      userLocation: observable
    });
  }

  locate() {
    if (typeof window !== 'undefined')
      window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        runInAction(() => {
          this.userLocation = { lat: latitude, lng: longitude };
        });
      });
  }

  initialLocate() {
    if (!this.userLocation) {
      this.locate();
    }
  }

  hydrate(data?: UserDetailsHydration) {
    if (data) {
      this.userLocation = data.userLocation;
    }
  }
}
