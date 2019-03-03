import ballsImage from './balls.png';
import ballsImage1 from './balls1.png';
import ballsImage2 from './balls2.png';

const games = [
  {
    id: 0,
    link: '/games/balls',
    status: 'done',
    image: ballsImage,
    title: 'Balls',
    subtitle: 'Card subtitle',
    description: 'You need remember the red balls, then they will change color to blue and you need follow them.',
  },
  {
    id: 1,
    link: '/games/reaction_test',
    status: 'done',
    image: ballsImage1,
    title: 'Reaction test',
    subtitle: 'Card subtitle',
    description: 'A red circle will show up at the center of the screen after a random time. After you see the circle, you should click <i>«Left Mouse»</i> or <i>«Space»</i> button as soon as possible.',
  },
  {
    id: 2,
    link: '/games/reaction_decision_test',
    status: '',
    image: ballsImage2,
    title: 'Reaction + Decision Test',
    subtitle: 'Card subtitle',
    description: 'A red or blue circle will show up at the center of the screen after a random time. After you see the circle, you should click mouse buttons (red = <i>«Left Click»</i>, blue = <i>«Right Click»</i>) as soon as possible.',
  },
  {
    id: 3,
    link: '/games/two_hands_coordination',
    status: 'danger',
    image: ballsImage2,
    title: 'Two–Hands Coordination',
    subtitle: 'Card subtitle',
    description: 'Description.',
  },
  {
    id: 4,
    link: '/games/keyboard_mouse_coordination',
    status: 'done',
    image: '',
    title: 'Keyboard–Mouse coordination',
    subtitle: 'Card subtitle',
    description: 'Description.',
  },
  {
    id: 5,
    link: '/games/keys_reaction_test',
    status: '',
    image: '',
    title: 'Keys Reaction Test',
    subtitle: 'Card subtitle',
    description: 'Description.',
  },
  {
    id: 6,
    link: '/games/mouse_tracking',
    status: '',
    image: '',
    title: 'Mouse Tracking',
    subtitle: 'Card subtitle',
    description: 'Description.',
  },
  {
    id: 7,
    link: '/games/mouse_aiming',
    status: '',
    image: '',
    title: 'Mouse Aiming',
    subtitle: 'Card subtitle',
    description: 'Description.',
  },
];

export default games;
