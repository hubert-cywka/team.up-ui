import MainLayout from '@layouts/main/MainLayout';
import { GetServerSideProps } from 'next';
import withAuth from '@components/hoc/with-auth/WithAuth';
import { Route } from '@shared/constants/Route';
import { routeWithReferer } from '@shared/utility/RouteUtils';
import TilesContainer from '@components/structure/tiles-container/TilesContainer';
import { ADD_EVENT_STEPS } from '@shared/constants/ContentConstants';
import AddEventForm from '@components/events/add-event-form/AddEventForm';
import SectionHeader from '@components/structure/section-header/SectionHeader';
import Builder from '@shared/utility/Builder';
import { useAddEvent } from '@shared/hooks/event/useAddEvent';
import Alert from '@components/primitives/alert/Alert';
import { CreateSportEventRequestWithDisciplineId } from '@shared/types/Events';
import { AxiosError } from 'axios';

const Activities = () => {
  const { mutateAsync: createEvent, status, error } = useAddEvent();

  const handleCreateEvent = (requestWithDisciplineId: CreateSportEventRequestWithDisciplineId) => {
    createEvent(requestWithDisciplineId);
  };

  const buildErrorMessage = (error: AxiosError) => {
    const status = error?.response?.status;

    switch (status) {
      case 400:
        return 'Invalid request.';

      case 401:
        return 'You are not authorized to create events.';

      case 404:
        return 'Selected sport discipline does not exist anymore.';

      default:
        return 'Server error. Try again later.';
    }
  };

  return (
    <MainLayout>
      <TilesContainer tiles={ADD_EVENT_STEPS} />
      <SectionHeader header="Add your own event." subheader="Fill this form, submit, its done." />
      <AddEventForm onSubmit={handleCreateEvent} disabled={status === 'loading'} />
      {Builder.createResult(status)
        .onSuccess(<Alert message="Your event was created." variant="success" />)
        .onError(
          <Alert
            message={'Failed to create event. '.concat(buildErrorMessage(error as AxiosError))}
            variant="error"
          />
        )
        .build()}
    </MainLayout>
  );
};

export default Activities;

export const getServerSideProps: GetServerSideProps = (context) =>
  withAuth(context, 'unauthenticated', routeWithReferer(Route.SIGN_IN, Route.EVENTS_ADD));
