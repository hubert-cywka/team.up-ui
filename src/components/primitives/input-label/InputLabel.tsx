import styles from './InputLabel.module.scss';
import { ComponentProps } from 'react';
import classNames from 'classnames';

interface InputLabelProps extends ComponentProps<'p'> {
  text: string;
  subtext: string;
  errorMessage?: string;
}

const InputLabel = ({ errorMessage, text, subtext, ...props }: InputLabelProps) => {
  return (
    <p className={styles.inputLabel} {...props}>
      <span>{text}</span>
      <span className={classNames(styles.subtext, { [styles.error]: !!errorMessage })}>
        {errorMessage ? errorMessage : subtext}
      </span>
    </p>
  );
};

export default InputLabel;
