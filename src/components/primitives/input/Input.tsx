import { ComponentProps, forwardRef } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface InputProps extends ComponentProps<'input'> {
  icon?: IconDefinition;
  iconClassName?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, iconClassName, fullWidth, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(styles.inputContainer, { [styles.fullWidth]: fullWidth })}>
        {icon && <FontAwesomeIcon className={classNames(styles.icon, iconClassName)} icon={icon} />}
        <input className={classNames(styles.input, className)} {...props} />
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
