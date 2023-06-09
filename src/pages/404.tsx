import ErrorMessage from 'components/error-message/ErrorMessage';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AppWrapper from '../components/app-wrapper/AppWrapper';

const Home = () => {
  return (
    <AppWrapper>
      <ErrorMessage
        icon={faXmark}
        header="Page not found!"
        message="This page does not exist, but it may be added in future. Click button below to go back."
      />
    </AppWrapper>
  );
};

export default Home;
