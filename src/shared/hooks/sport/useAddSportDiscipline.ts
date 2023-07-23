import { useMutation } from 'react-query';
import { addSportDiscipline } from '@services/SportDisciplineService';
import { useRefreshSportDisciplines } from './useRefreshSportDisciplines';

export const useAddSportDiscipline = () => {
  return useMutation(['SPORT', 'ADD_SPORT_MUTATION_KEY'], addSportDiscipline, {
    onSuccess: () => {
      useRefreshSportDisciplines();
    }
  });
};
