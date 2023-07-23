import { SportEvent } from '@shared/types/Events';
import styles from './EventItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPeopleGroup, faLocation, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { calculateDistanceInKilometers } from '@shared/utility/LocationUtils';
import { useUserDetailsStore } from '@stores/UserDetailsStore';
import { memo } from 'react';

interface EventItemProps {
  event: SportEvent;
}

const EventItem = ({ event }: EventItemProps) => {
  const userDetailsStore = useUserDetailsStore();

  const getDate = () => {
    return new Date(event.startDate).toLocaleDateString();
  };

  const getTime = () => {
    return new Date(event.startDate).toLocaleTimeString().slice(0, -3);
  };

  return (
    <article className={styles.eventItem}>
      <section className={styles.details}>
        <p className={styles.detailsRow}>
          <span>
            <FontAwesomeIcon icon={faPeopleGroup} /> {event.minPlayers} - {event.maxPlayers}
          </span>
          {userDetailsStore.userLocation && (
            <span>
              <FontAwesomeIcon icon={faLocation} />{' '}
              {calculateDistanceInKilometers(userDetailsStore.userLocation, event.location)} km
            </span>
          )}
        </p>

        <p className={styles.detailsRow}>
          <span>
            <FontAwesomeIcon icon={faCalendar} /> {getDate()}
          </span>
          <span>
            <FontAwesomeIcon icon={faClock} /> {getTime()}
          </span>
        </p>
      </section>
    </article>
  );
};

export default memo(EventItem);
