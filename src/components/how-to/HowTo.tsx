import styles from './HowTo.module.scss';
import Tile from '@/components/tile/Tile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faBasketball } from '@fortawesome/free-solid-svg-icons';

const HowTo = () => {
  return (
    <div className={styles['how-to-container']}>
      <Tile
        header="Find game"
        text="Start by searching for disciplines you are into."
        icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
      />
      <Tile
        header="Join squad"
        text="Does place, time and discipline suit you? Sign up and meet your teammates."
        icon={<FontAwesomeIcon icon={faPeopleGroup} />}
      />
      <Tile
        header="Add lobby"
        text="You can also create your own game. Choose place, time, sport and rules."
        icon={<FontAwesomeIcon icon={faCalendar} />}
      />
      <Tile
        header="All set"
        text="That's all. It's that simple. Do your best on the field!"
        icon={<FontAwesomeIcon icon={faBasketball} />}
      />
    </div>
  );
};

export default HowTo;
