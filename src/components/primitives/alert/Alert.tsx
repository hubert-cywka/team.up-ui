import styles from './Alert.module.scss';
import classNames from 'classnames';
import { ComponentProps } from 'react';

interface AlertProps extends ComponentProps<'div'> {
  content: string;
  variant?: 'error' | 'info' | 'success' | 'warning';
}

const Alert = ({ content, variant = 'info', className }: AlertProps) => {
  return <p className={classNames(styles.alertContainer, styles[variant], className)}>{content}</p>;
};

export default Alert;
