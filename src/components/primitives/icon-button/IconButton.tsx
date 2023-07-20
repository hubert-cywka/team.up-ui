import { ComponentProps } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './IconButton.module.scss';
import classNames from 'classnames';

interface IconButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  icon: IconDefinition;
}

const IconButton = ({ icon, className, type = 'button', ...props }: IconButtonProps) => {
  return (
    <button {...props} type={type} className={classNames(styles.iconButton, className)}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
    </button>
  );
};

export default IconButton;
