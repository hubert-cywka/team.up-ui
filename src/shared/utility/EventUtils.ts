import { SportEvent } from '@shared/types/Events';

export const isUserEnrolledForThisEvent = (userId: string, event: SportEvent) => {
  return !!event.users.find((user) => user.id === userId);
};
