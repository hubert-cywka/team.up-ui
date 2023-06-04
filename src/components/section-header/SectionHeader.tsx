import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  header: string;
  subheader?: string;
}

const SectionHeader = ({ header, subheader }: SectionHeaderProps) => {
  const words = header.split(' ');

  return (
    <div className={styles['section-header']}>
      <div className={styles['header']}>
        {words.map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </div>
      {subheader && <div className={styles['subheader']}>{subheader}</div>}
    </div>
  );
};

export default SectionHeader;
