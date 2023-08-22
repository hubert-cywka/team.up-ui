'use client';

import { SportEvent } from '@shared/types/Events';
import styles from './EventItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPeopleGroup, faLocation, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { calculateDistanceInKilometers } from '@shared/utility/LocationUtils';
import { useUserDetailsStore } from '@stores/UserDetailsStore';
import { memo } from 'react';
import classNames from 'classnames';
import { getLastUpdatedLabelFromDate } from '@shared/utility/DateUtils';
import { useAuthSession } from '@shared/hooks/auth/useAuthSession';
import Button from '@components/primitives/button/Button';
import { isUserEnrolledForThisEvent } from '@shared/utility/EventUtils';
import { useEventEnrollment } from '@shared/hooks/event/useEventEnrollment';

interface EventItemProps {
  event: SportEvent;
}

const EventItem = ({ event }: EventItemProps) => {
  const { user } = useAuthSession();
  const userDetailsStore = useUserDetailsStore();
  const { join, cancel, joinStatus, cancelStatus, reset } = useEventEnrollment(
    event.disciplineId,
    event._id
  );

  const startDate = new Date(event.startDate).toLocaleDateString();
  const startTime = new Date(event.startDate).toLocaleTimeString().slice(0, -3);
  const leftSlots = event.maxPlayers - event.users.length;
  const shouldDisplayJoinButton = user && !isUserEnrolledForThisEvent(user.id, event);
  const shouldDisplayCancelButton = user && isUserEnrolledForThisEvent(user.id, event);

  const handleCanceling = () => {
    reset();
    cancel();
  };

  const handleEnrollment = () => {
    reset();
    join();
  };

  return (
    <article className={styles.eventItem}>
      <section className={styles.contentContainer}>
        <p className={styles.topLine}>
          <span className={styles.availability}>
            <span
              className={classNames(styles.availabilityDot, { [styles.available]: leftSlots })}
            />
            <span>
              {leftSlots} slot{leftSlots === 1 ? '' : 's'} left
            </span>
          </span>
          {event.updatedAt && (
            <span className={styles.lastUpdated}>
              {getLastUpdatedLabelFromDate(new Date(event.updatedAt))}
            </span>
          )}
        </p>

        <p className={styles.description}>{event.description}</p>

        <section className={styles.details}>
          <p className={styles.detailsRow}>
            <span>
              <FontAwesomeIcon className={styles.icon} icon={faPeopleGroup} /> {event.minPlayers} -{' '}
              {event.maxPlayers}
            </span>
            {userDetailsStore.userLocation && (
              <span>
                <FontAwesomeIcon className={styles.icon} icon={faLocation} />{' '}
                {calculateDistanceInKilometers(userDetailsStore.userLocation, event.location)} km
                away
              </span>
            )}
          </p>

          <p className={styles.detailsRow}>
            <span>
              <FontAwesomeIcon className={styles.icon} icon={faCalendar} /> {startDate}
            </span>
            <span>
              <FontAwesomeIcon className={styles.icon} icon={faClock} /> {startTime}
            </span>
          </p>
        </section>
      </section>

      {shouldDisplayJoinButton && (
        <Button className={styles.button} variant="secondary" onClick={handleEnrollment}>
          {joinStatus === 'success' && 'Cancel'}
          {joinStatus === 'loading' && 'Joining...'}
          {joinStatus === 'error' && 'Failed to join!'}
          {joinStatus === 'idle' && 'Join'}
        </Button>
      )}

      {shouldDisplayCancelButton && (
        <Button className={styles.button} variant="secondary" onClick={handleCanceling}>
          {cancelStatus === 'success' && 'Join'}
          {cancelStatus === 'loading' && 'Canceling...'}
          {cancelStatus === 'error' && 'Failed to cancel!'}
          {cancelStatus === 'idle' && 'Cancel'}
        </Button>
      )}
    </article>
  );
};

export default memo(EventItem);
