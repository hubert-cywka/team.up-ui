import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './ErrorMessage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'primitives/button/Button';
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
      <div className={styles.header}>{header}</div>
      <div>{message}</div>
      <Button className={styles.goBackButton} onClick={router.back} variant="main">
        Go back
      </Button>
    </div>
  );
};

export default ErrorMessage;
