import MainLayout from '@layouts/main/MainLayout';
import SportsPanel from '@components/sports/sports-panel/SportsPanel';
import Builder from '@shared/utility/Builder';
import { useSportDisciplines } from '@shared/hooks/sport/useSportDisciplines';
import Alert from '@components/primitives/alert/Alert';
import AddEventBanner from '@components/events/add-event-banner/AddEventBanner';

const Activities = () => {
  const sportsQuery = useSportDisciplines();

  return (
    <MainLayout>
      <AddEventBanner />
      {Builder.createResult(sportsQuery.status)
        .onSuccess(<>{sportsQuery.data && <SportsPanel availableSports={sportsQuery.data} />}</>)
        .onError(<Alert variant="error" message="Failed to get sport disciplines." />)
        .build()}
    </MainLayout>
  );
};

export default Activities;
