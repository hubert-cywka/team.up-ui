import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  text: string;
}

const SectionHeader = ({ text }: SectionHeaderProps) => {
  const words = text.split(' ');

  return (
    <div className={styles['section-header']}>
      {words.map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </div>
  );
};

export default SectionHeader;
