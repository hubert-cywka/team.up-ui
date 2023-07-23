import { SportEvent } from '@shared/types/Events';
import { observer } from 'mobx-react-lite';
import EventItem from '@components/events/event-item/EventItem';
import styles from './EventsList.module.scss';
import Alert from '@components/primitives/alert/Alert';
import classNames from 'classnames';

interface EventsListProps {
  events: SportEvent[];
}

const EventsList = observer(({ events }: EventsListProps) => {
  return (
    <section className={classNames(styles.eventsList, { [styles.empty]: !events.length })}>
      {!events.length ? (
        <Alert variant="warning" message="No events to show." />
      ) : (
        events.map((event) => <EventItem key={event._id} event={event} />)
      )}
    </section>
  );
});

export default EventsList;
