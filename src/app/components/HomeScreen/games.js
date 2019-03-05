import ballsLang from 'src/games/balls/lang';
import reactionTestLang from 'src/games/reaction_test/lang';
import reactionDecisionTestLang from 'src/games/reaction_decision_test/lang';
import keyboardMouseCoordinationLang from 'src/games/keyboard_mouse_coordination/lang';
import mouseTrackingLang from 'src/games/mouse_tracking/lang';
import ballsImage from './balls.png';
import ballsImage1 from './balls1.png';
import ballsImage2 from './balls2.png';

const current_lang = 'en';

const games = [
  {
    link: '/games/balls',
    status: 'done',
    image: ballsImage,
    title: 'Balls',
    subtitle: 'Card subtitle',
    description: ballsLang[current_lang].description,
  },
  {
    link: '/games/reaction_test',
    status: 'done',
    image: ballsImage1,
    title: 'Reaction test',
    subtitle: 'Card subtitle',
    description: reactionTestLang[current_lang].description,
  },
  {
    link: '/games/reaction_decision_test',
    status: '',
    image: ballsImage2,
    title: 'Reaction + Decision Test',
    subtitle: 'Card subtitle',
    description: reactionDecisionTestLang[current_lang].description,
  },
  {
    link: '/games/two_hands_coordination',
    status: 'danger',
    image: ballsImage2,
    title: 'Two–Hands Coordination',
    subtitle: 'Card subtitle',
    description: 'Description.',
  },
  {
    link: '/games/keyboard_mouse_coordination',
    status: 'done',
    image: '',
    title: 'Keyboard–Mouse coordination',
    subtitle: 'Card subtitle',
    description: keyboardMouseCoordinationLang[current_lang].Menu.description,
  },
  {
    link: '/games/keys_reaction_test',
    status: '',
    image: '',
    title: 'Keys Reaction Test',
    subtitle: 'Card subtitle',
    description: 'Description.',
  },
  {
    link: '/games/mouse_tracking',
    status: 'done',
    image: '',
    title: 'Mouse Tracking',
    subtitle: 'Card subtitle',
    description: mouseTrackingLang[current_lang].Menu.description,
  },
  {
    link: '/games/mouse_aiming',
    status: '',
    image: '',
    title: 'Mouse Aiming',
    subtitle: 'Card subtitle',
    description: 'Description.',
  },
];

let i = 0;
for (const game in games) {
  if (Object.prototype.hasOwnProperty.call(games, game)) {
    games[game].id = i;
    i += 1;
  }
}

export default games;
