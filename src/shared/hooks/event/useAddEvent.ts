import { useMutation } from 'react-query';
import { addEvent } from '@services/EventService';
import { useRefreshEvents } from './useRefreshEvents';

export const useAddEvent = () => {
  return useMutation(['EVENT', 'ADD_EVENT_MUTATION_KEY'], addEvent, {
    onSuccess: () => {
      useRefreshEvents();
    }
  });
};
