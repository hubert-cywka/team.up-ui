import { PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import { ButtonBase, ButtonBaseProps } from '@mui/material';

interface ButtonProps extends ButtonBaseProps {
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
    <ButtonBase
      type={type}
      className={`${styles['button']} ${styles[variant]} ${className ? className : ''}`}
      onClick={onClick}>
      {children}
    </ButtonBase>
  );
};

export default Button;
