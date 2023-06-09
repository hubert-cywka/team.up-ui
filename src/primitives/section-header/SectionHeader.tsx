import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  header: string;
  subheader?: string;
  variant?: 'outside' | 'inside';
}

const SectionHeader = ({ header, subheader, variant = 'outside' }: SectionHeaderProps) => {
  return (
    <div className={`${styles.sectionHeader} ${styles[variant]}`}>
      <div className={styles.header}>{header}</div>
      {subheader && <div className={styles.subheader}>{subheader}</div>}
    </div>
  );
};

export default SectionHeader;
