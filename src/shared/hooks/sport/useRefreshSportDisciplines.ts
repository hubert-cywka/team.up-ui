import { AppQueryClient } from '@services/QueryClient';

export const useRefreshSportDisciplines = () => {
  AppQueryClient.invalidateQueries(['SPORT']);
};
