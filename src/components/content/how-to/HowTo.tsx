import styles from './HowTo.module.scss';
import Tile, { TileProps } from 'components/content/tile/Tile';
import {
  faPeopleGroup,
  faCalendar,
  faBasketball,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';

const HowTo = () => {
  const TilesContent: TileProps[] = [
    {
      text: 'Start by searching for disciplines you are into.',
      icon: faMagnifyingGlass,
      header: 'Find game',
      step: 1
    },
    {
      text: 'Does place, time and discipline suit you? Sign up and meet your teammates.',
      icon: faPeopleGroup,
      header: 'Join squad',
      step: 2
    },
    {
      text: 'You can also create your own game. Choose place, time, sport and rules.',
      icon: faCalendar,
      header: 'Add lobby',
      step: 3
    },
    {
      text: "That's all. It's that simple. Do your best on the field!",
      icon: faBasketball,
      header: 'All set',
      step: 4
    }
  ];

  return (
    <section className={styles.howToContainer}>
      {TilesContent.map((tile) => (
        <Tile
          key={tile.step}
          header={tile.header}
          text={tile.text}
          icon={tile.icon}
          step={tile.step}
        />
      ))}
    </section>
  );
};

export default memo(HowTo);
