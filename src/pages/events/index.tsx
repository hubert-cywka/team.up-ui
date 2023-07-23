import MainLayout from '@layouts/main/MainLayout';
import SportsPanel from '@components/sports/sports-panel/SportsPanel';
import Builder from '@shared/utility/Builder';
import { useSportDisciplines } from '@shared/hooks/sport/useSportDisciplines';
import Alert from '@components/primitives/alert/Alert';
import AddEventBanner from '@components/events/add-event-banner/AddEventBanner';
import { useEvents } from '@shared/hooks/event/useEvents';
import EventsList from '@components/events/events-list/EventsList';
import { observer } from 'mobx-react-lite';
import { useSportDisciplineStore } from '@stores/SportDisciplinesStore';
import { useUserDetailsStore } from '@stores/UserDetailsStore';
import { useEffect } from 'react';

const Activities = observer(() => {
  const userDetailsStore = useUserDetailsStore();
  const sportsStore = useSportDisciplineStore();
  const { data: sports, status: sportsStatus } = useSportDisciplines();
  const { data: events, status: eventsStatus } = useEvents(sportsStore.sport?._id);

  useEffect(() => {
    userDetailsStore.initialLocate();
  }, []);

  return (
    <MainLayout>
      <AddEventBanner />

      {Builder.createResult(sportsStatus)
        .onSuccess(<>{sports && <SportsPanel availableSports={sports} />}</>)
        .onError(<Alert variant="error" message="Failed to get sport disciplines." />)
        .build()}

      {Builder.createResult(eventsStatus)
        .onSuccess(<>{events && <EventsList events={events} />}</>)
        .onError(<Alert variant="error" message="Failed to get events from that discipline." />)
        .build()}
    </MainLayout>
  );
});

export default Activities;
