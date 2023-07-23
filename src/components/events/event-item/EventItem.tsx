import { SportEvent } from '@shared/types/Events';
import styles from './EventItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPeopleGroup, faLocation, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { calculateDistanceInKilometers } from '@shared/utility/LocationUtils';
import { useUserDetailsStore } from '@stores/UserDetailsStore';
import { memo } from 'react';
import classNames from 'classnames';

interface EventItemProps {
  event: SportEvent;
}

const EventItem = ({ event }: EventItemProps) => {
  const userDetailsStore = useUserDetailsStore();
  const startDate = new Date(event.startDate).toLocaleDateString();
  const startTime = new Date(event.startDate).toLocaleTimeString().slice(0, -3);
  const leftSlots = Math.floor(Math.random() * 5); // TODO remove this mock;

  const getLastUpdated = () => {
    if (!event.updatedAt) return;

    const timeDifferenceInSeconds =
      (new Date().getTime() - new Date(event.updatedAt).getTime()) / 1000;

    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let result = 'Last updated: ';

    if (days) {
      return result.concat(`${days} day${days === 1 ? '' : 's'} ago`);
    } else if (hours) {
      return result.concat(`${hours} hour${hours === 1 ? '' : 's'} ago`);
    } else if (minutes) {
      return result.concat(`${minutes} minute${minutes === 1 ? '' : 's'} ago`);
    }

    return result.concat('just now');
  };

  return (
    <article className={styles.eventItem}>
      <p className={styles.topLine}>
        <span className={styles.availability}>
          <div className={classNames(styles.availabilityDot, { [styles.available]: leftSlots })} />
          <span>
            {leftSlots} slot{leftSlots === 1 ? '' : 's'} left
          </span>
        </span>
        <span className={styles.lastUpdated}>{getLastUpdated()}</span>
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
