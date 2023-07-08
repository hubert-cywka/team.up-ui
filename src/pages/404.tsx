import MessageBox from 'components/content/message-box/MessageBox';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import CenteredLayout from '../layouts/error/CenteredLayout';

const NotFoundPage = () => {
  return (
    <CenteredLayout>
      <MessageBox
        icon={faXmark}
        header="Page not found!"
        message="This page does not exist, but it may be added in future. Click button below to go back."
      />
    </CenteredLayout>
  );
};

export default NotFoundPage;
