import { useMutation } from 'react-query';
import { deleteSportDiscipline } from '@services/SportDisciplineService';
import { useRefreshSportDisciplines } from './useRefreshSportDisciplines';

export const useDeleteSportDiscipline = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation(['SPORT', 'DELETE_SPORT_MUTATION_KEY'], deleteSportDiscipline, {
    onSuccess: () => {
      useRefreshSportDisciplines();
      onSuccess();
    }
  });
};
