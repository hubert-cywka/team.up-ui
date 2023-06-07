import { PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  variant: 'main' | 'success' | 'error';
  className?: string;
}

const Button = ({ onClick, children, variant, className }: PropsWithChildren<ButtonProps>) => {
  return (
    <div
      className={`${styles['button']} ${styles[variant]} ${className ? className : ''}`}
      onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
