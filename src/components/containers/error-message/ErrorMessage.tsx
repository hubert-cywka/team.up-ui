import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './ErrorMessage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/primitives/button/Button';
import { useRouter } from 'next/router';

interface ErrorMessageProps {
  icon: IconDefinition;
  header: string;
  message: string;
}

const ErrorMessage = ({ icon, header, message }: ErrorMessageProps) => {
  const router = useRouter();

  return (
    <div className={styles.errorMessage}>
      <FontAwesomeIcon className={styles.icon} icon={icon} />
      <h2 className={styles.header}>{header}</h2>
      <p>{message}</p>
      <Button className={styles.goBackButton} onClick={router.back} variant="main">
        Go back
      </Button>
    </div>
  );
};

export default ErrorMessage;
