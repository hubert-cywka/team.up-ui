import MainLayout from 'layouts/main/MainLayout';
import SportsList from 'components/sports/sports-list/SportsList';
import Builder from 'shared/utility/Builder';
import { useSportDisciplines } from 'shared/hooks/sport/useSportDisciplines';
import Alert from 'components/primitives/alert/Alert';

const Home = () => {
  const sportsQuery = useSportDisciplines();

  return (
    <MainLayout>
      {Builder.createResult(sportsQuery.status)
        .onSuccess(<>{sportsQuery.data && <SportsList sports={sportsQuery.data} />}</>)
        .onError(<Alert variant="error" content="Failed to get sport disciplines." />)
        .build()}
    </MainLayout>
  );
};

export default Home;
