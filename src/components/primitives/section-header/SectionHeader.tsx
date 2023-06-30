import styles from './SectionHeader.module.scss';
import { memo } from 'react';
import classNames from 'classnames';

interface SectionHeaderProps {
  header: string;
  subheader?: string;
  variant?: 'outside' | 'inside';
}

const SectionHeader = ({ header, subheader, variant = 'outside' }: SectionHeaderProps) => {
  return (
    <div className={classNames(styles.sectionHeader, styles[variant])}>
      <h2 className={styles.header}>{header}</h2>
      {subheader && <h3 className={styles.subheader}>{subheader}</h3>}
    </div>
  );
};

export default memo(SectionHeader);
