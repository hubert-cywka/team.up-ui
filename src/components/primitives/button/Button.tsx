import { ComponentProps, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

export interface ButtonProps extends ComponentProps<'button'> {
  variant: 'main' | 'success' | 'error' | 'secondary' | 'plain';
}

const Button = ({
  onClick,
  children,
  variant,
  className,
  type = 'button',
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type={type}
      className={classNames(styles.button, styles[variant], className)}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
