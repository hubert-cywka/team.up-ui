import { GeoPosition } from './Other';
import { UserDetails } from '@shared/types/User';

export interface SportEvent {
  _id: string;
  minPlayers: number;
  maxPlayers: number;
  location: GeoPosition;
  startDate: string;
  description: string;
  users: UserDetails[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSportEventRequest extends Omit<SportEvent, '_id' | 'users'> {}

export interface CreateSportEventRequestWithDisciplineId extends CreateSportEventRequest {
  sportDisciplineId: string;
}
