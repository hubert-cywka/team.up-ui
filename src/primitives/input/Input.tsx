import { ComponentProps, forwardRef, ReactNode } from 'react';
import styles from './Input.module.scss';

interface InputProps extends ComponentProps<'input'> {
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, icon, ...props }, ref) => {
  return (
    <div ref={ref} className={styles.inputContainer}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <input className={`${styles.input} ${className ? className : ''}`} {...props} />
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
