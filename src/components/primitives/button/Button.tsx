import { ComponentProps, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps extends ComponentProps<'button'> {
  variant: 'main' | 'success' | 'error' | 'secondary';
}

const Button = ({
  onClick,
  children,
  variant,
  className,
  type
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type={type}
      className={classNames(styles.button, styles[variant], className)}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
