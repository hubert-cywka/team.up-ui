import { AppQueryClient } from 'services/QueryClient';

export const useRefreshEvents = () => {
  AppQueryClient.invalidateQueries(['EVENT']);
};
