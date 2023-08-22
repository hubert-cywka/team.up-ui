import { useMutation } from 'react-query';
import { cancelEnrollmentForEvent, enrollForEvent } from '@services/EventService';
import { useRefreshEvents } from '@shared/hooks/event/useRefreshEvents';

export const useEventEnrollment = (sportDisciplineId: string, eventId: string) => {
  const {
    mutate: join,
    status: joinStatus,
    reset: resetJoin
  } = useMutation(
    ['EVENT', 'ENROLL_FOR_EVENT', eventId],
    () => enrollForEvent(sportDisciplineId, eventId),
    {
      onSuccess: () => useRefreshEvents()
    }
  );
  const {
    mutate: cancel,
    status: cancelStatus,
    reset: resetCancel
  } = useMutation(
    ['EVENT', 'CANCEL_ENROLLMENT_FOR_EVENT', eventId],
    () => cancelEnrollmentForEvent(sportDisciplineId, eventId),
    {
      onSuccess: () => useRefreshEvents()
    }
  );

  const reset = () => {
    resetCancel();
    resetJoin();
  };

  return { join, cancel, joinStatus, cancelStatus, reset };
};
