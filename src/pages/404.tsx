import ErrorMessage from 'components/content/error-message/ErrorMessage';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import MainLayout from '../layouts/main/MainLayout';

const NotFoundPage = () => {
  return (
    <MainLayout>
      <ErrorMessage
        icon={faXmark}
        header="Page not found!"
        message="This page does not exist, but it may be added in future. Click button below to go back."
      />
    </MainLayout>
  );
};

export default NotFoundPage;
