import MainLayout from 'layouts/main/MainLayout';
import SportsList from 'components/sports/sports-list/SportsList';
import Builder from 'shared/utility/Builder';
import { useSportDisciplines } from 'shared/hooks/sport/useSportDisciplines';
import Alert from 'components/primitives/alert/Alert';
import AddEventBanner from 'components/events/add-event-banner/AddEventBanner';

const Activities = () => {
  const sportsQuery = useSportDisciplines();

  const buildSportsList = () => {
    return Builder.createResult(sportsQuery.status)
      .onSuccess(<>{sportsQuery.data && <SportsList sports={sportsQuery.data} />}</>)
      .onError(<Alert variant="error" content="Failed to get sport disciplines." />)
      .build();
  };

  return (
    <MainLayout>
      <AddEventBanner />
      {buildSportsList()}
    </MainLayout>
  );
};

export default Activities;
