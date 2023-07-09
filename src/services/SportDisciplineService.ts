import { apiClient } from './ApiClient';
import { CreateSportDisciplineRequest, SportDiscipline } from 'shared/types/Sport';

export const getSportDisciplines = async () => {
  const { data } = await apiClient.get<SportDiscipline[]>(`/sports`);
  return data.slice();
};

export const addSportDiscipline = async (request: CreateSportDisciplineRequest) => {
  const { data } = await apiClient.post<SportDiscipline>(`/sports`, request);
  return data;
};

export const updateSportDiscipline = async (newSport: SportDiscipline) => {
  const { data } = await apiClient.put<SportDiscipline>(`/sports/${newSport._id}`, newSport);
  return data;
};

export const deleteSportDiscipline = async (id: string) => {
  const { data } = await apiClient.delete<SportDiscipline>(`/sports/${id}`);
  return data;
};
