import { TileProps } from '../../components/structure/tile/Tile';
import {
  faBasketball,
  faCalendar,
  faCircleInfo,
  faMagnifyingGlass,
  faPeopleGroup,
  faPersonRunning,
  faScaleBalanced,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons';

export const HOW_TO_USE_STEPS: TileProps[] = [
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

export const ADD_EVENT_STEPS: TileProps[] = [
  {
    text: 'Select sport discipline for your custom event.',
    icon: faPersonRunning,
    header: 'Sport',
    step: 1
  },
  {
    text: 'Specify start time, place and number of participants.',
    icon: faCircleInfo,
    header: 'Details',
    step: 2
  },
  {
    text: 'Set your own rules and tell more about your event in its description.',
    icon: faScaleBalanced,
    header: 'Rules',
    step: 3
  },
  {
    text: 'Submit your event. You will be automatically marked as organizer.',
    icon: faThumbsUp,
    header: 'All set',
    step: 4
  }
];
