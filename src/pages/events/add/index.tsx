import MainLayout from 'layouts/main/MainLayout';
import { GetServerSideProps } from 'next';
import withAuth from 'components/hoc/WithAuth';
import { Route } from 'shared/constants/Route';
import { routeWithReferer } from 'shared/utility/RouteUtils';
import TilesContainer from 'components/primitives/tiles-container/TilesContainer';
import { ADD_EVENT_STEPS } from 'shared/constants/ContentConstants';

const Activities = () => {
  return (
    <MainLayout>
      <TilesContainer tiles={ADD_EVENT_STEPS} />
    </MainLayout>
  );
};

export default Activities;

export const getServerSideProps: GetServerSideProps = (context) =>
  withAuth(context, 'unauthenticated', routeWithReferer(Route.SIGN_IN, Route.EVENTS_ADD));
