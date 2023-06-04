import styles from './HowTo.module.scss';
import Tile, { TileProps } from '@/components/tile/Tile';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faBasketball } from '@fortawesome/free-solid-svg-icons';

const TilesContent: TileProps[] = [
  {
    text: 'Start by searching for disciplines you are into.',
    icon: faMagnifyingGlass,
    header: 'Find game'
  },
  {
    text: 'Does place, time and discipline suit you? Sign up and meet your teammates.',
    icon: faPeopleGroup,
    header: 'Join squad'
  },
  {
    text: 'You can also create your own game. Choose place, time, sport and rules.',
    icon: faCalendar,
    header: 'Add lobby'
  },
  {
    text: "That's all. It's that simple. Do your best on the field!",
    icon: faBasketball,
    header: 'All set'
  }
];

const HowTo = () => {
  return (
    <div className={styles['how-to-container']}>
      {TilesContent.map((tile, index) => (
        <Tile key={index} header={tile.header} text={tile.text} icon={tile.icon} step={index + 1} />
      ))}
    </div>
  );
};

export default HowTo;
