import styles from './Alert.module.scss';
import classNames from 'classnames';
import { ComponentProps } from 'react';

interface AlertProps extends ComponentProps<'div'> {
  message: string;
  variant?: 'error' | 'info' | 'success' | 'warning';
}

const Alert = ({ message, variant = 'info', className }: AlertProps) => {
  return <p className={classNames(styles.alertContainer, styles[variant], className)}>{message}</p>;
};

export default Alert;
