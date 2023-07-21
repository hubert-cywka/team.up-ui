import { useMutation } from 'react-query';
import { updateSportDiscipline } from '@services/SportDisciplineService';
import { useRefreshSportDisciplines } from './useRefreshSportDisciplines';

export const useEditSportDiscipline = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation(['SPORT', 'EDIT_SPORT_MUTATION_KEY'], updateSportDiscipline, {
    onSuccess: () => {
      useRefreshSportDisciplines();
      onSuccess();
    }
  });
};
