import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './MessageBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@components/primitives/button/Button';
import { useRouter } from 'next/router';
import classNames from 'classnames';

interface StatusMessageProps {
  icon: IconDefinition;
  header: string;
  message: string;
  variant?: 'error' | 'status' | 'info' | 'success';
  buttonText?: string;
  onButtonClick?: () => void;
}

const MessageBox = ({
  icon,
  header,
  message,
  variant = 'error',
  buttonText = 'Go back',
  onButtonClick
}: StatusMessageProps) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      router.back();
    }
  };

  return (
    <div className={classNames(styles.messageBox, styles[variant])} data-testid="message-box">
      <FontAwesomeIcon className={styles.icon} icon={icon} />
      <h2 className={styles.header} data-testid="header">
        {header}
      </h2>
      <p data-testid="message">{message}</p>
      <Button
        name={buttonText}
        className={styles.button}
        onClick={handleButtonClick}
        variant="main"
        data-testid="button">
        {buttonText}
      </Button>
    </div>
  );
};

export default MessageBox;
