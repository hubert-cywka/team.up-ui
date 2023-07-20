import { ComponentProps } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames';

interface TextAreaProps extends ComponentProps<'textarea'> {}

const TextArea = ({ className, ...props }: TextAreaProps) => {
  return <textarea {...props} className={classNames(styles.textArea, className)} />;
};

export default TextArea;
