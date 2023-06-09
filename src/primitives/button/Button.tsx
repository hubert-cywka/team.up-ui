import { ComponentProps, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

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
      className={`${styles.button} ${styles[variant]} ${className ? className : ''}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
