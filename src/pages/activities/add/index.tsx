import MainLayout from 'layouts/main/MainLayout';
import AddEventInfo from 'components/events/add-event-info/AddEventInfo';
import { GetServerSideProps } from 'next';
import withAuth from 'components/hoc/WithAuth';
import { Route } from 'shared/constants/Route';
import { routeWithReferer } from '../../../shared/utility/RouteUtils';

const Activities = () => {
  return (
    <MainLayout>
      <AddEventInfo />
    </MainLayout>
  );
};

export default Activities;

export const getServerSideProps: GetServerSideProps = (context) =>
  withAuth(context, 'unauthenticated', routeWithReferer(Route.SIGN_IN, Route.ACTIVITIES_ADD));
