import { useQuery } from 'react-query';
import { getSportDisciplines } from '@services/SportDisciplineService';

export const useSportDisciplines = () => {
  return useQuery(['SPORT', 'SPORT_DISCIPLINES_QUERY'], getSportDisciplines);
};
