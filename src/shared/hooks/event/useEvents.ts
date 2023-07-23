import { useQuery } from 'react-query';
import { getEventsFromDiscipline } from '@services/EventService';

export const useEvents = (sportDisciplineId?: string | null) => {
  return useQuery(
    ['EVENT', 'GET_EVENTS_QUERY_KEY', `ID: ${sportDisciplineId}`],
    () => getEventsFromDiscipline(sportDisciplineId ?? ''),
    { enabled: !!sportDisciplineId }
  );
};
