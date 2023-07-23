import { GeoPosition } from './Other';

export interface SportEvent {
  _id: string;
  minPlayers: number;
  maxPlayers: number;
  location: GeoPosition;
  startDate: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSportEventRequest extends Omit<SportEvent, '_id'> {}

export interface CreateSportEventRequestWithDisciplineId extends CreateSportEventRequest {
  sportDisciplineId: string;
}
