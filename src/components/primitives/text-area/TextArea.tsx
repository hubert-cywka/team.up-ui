import { ComponentProps } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames';

interface TextAreaProps extends ComponentProps<'textarea'> {
  variant?: 'main' | 'secondary';
}

const TextArea = ({ className, variant = 'main', ...props }: TextAreaProps) => {
  return (
    <textarea {...props} className={classNames(styles.textArea, className, styles[variant])} />
  );
};

export default TextArea;
