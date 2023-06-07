import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './ErrorMessage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/components/button/Button';
import { useRouter } from 'next/router';

interface ErrorMessageProps {
  icon: IconDefinition;
  header: string;
  message: string;
}

const ErrorMessage = ({ icon, header, message }: ErrorMessageProps) => {
  const router = useRouter();

  return (
    <div className={styles['error-message']}>
      <FontAwesomeIcon className={styles['icon']} icon={icon} />
      <div className={styles['header']}>{header}</div>
      <div className={styles['message']}>{message}</div>
      <Button className={styles['go-back-button']} onClick={router.back} variant="main">
        Go back
      </Button>
    </div>
  );
};

export default ErrorMessage;
