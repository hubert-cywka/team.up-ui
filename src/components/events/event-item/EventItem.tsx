import { SportEvent } from '@shared/types/Events';
import styles from './EventItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPeopleGroup, faLocation, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { calculateDistanceInKilometers } from '@shared/utility/LocationUtils';
import { useUserDetailsStore } from '@stores/UserDetailsStore';
import { memo } from 'react';
import classNames from 'classnames';
import { getLastUpdatedLabelFromDate } from '@shared/utility/DateUtils';

interface EventItemProps {
  event: SportEvent;
}

const EventItem = ({ event }: EventItemProps) => {
  const userDetailsStore = useUserDetailsStore();
  const startDate = new Date(event.startDate).toLocaleDateString();
  const startTime = new Date(event.startDate).toLocaleTimeString().slice(0, -3);
  const leftSlots = Math.floor(Math.random() * event.maxPlayers); // TODO remove this mock;

  return (
    <article className={styles.eventItem}>
      <p className={styles.topLine}>
        <span className={styles.availability}>
          <span className={classNames(styles.availabilityDot, { [styles.available]: leftSlots })} />
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
              {calculateDistanceInKilometers(userDetailsStore.userLocation, event.location)} km away
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
    </article>
  );
};

export default memo(EventItem);
