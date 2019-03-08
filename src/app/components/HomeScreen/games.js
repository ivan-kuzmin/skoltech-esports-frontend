import ballsLang from 'src/games/balls/lang';
import reactionTestLang from 'src/games/reaction_test/lang';
import reactionDecisionTestLang from 'src/games/reaction_decision_test/lang';
import keyboardMouseCoordinationLang from 'src/games/keyboard_mouse_coordination/lang';
import keysReactionTestLang from 'src/games/keys_reaction_test/lang';
import mouseTrackingLang from 'src/games/mouse_tracking/lang';
import mouseAimingLang from 'src/games/mouse_aiming/lang';
import optimalTrajectoryLang from 'src/games/optimal_trajectory/lang';
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
    description: ballsLang[current_lang].description,
  },
  {
    link: '/games/reaction_test',
    status: 'done',
    image: ballsImage1,
    title: 'Reaction test',
    description: reactionTestLang[current_lang].description,
  },
  {
    link: '/games/reaction_decision_test',
    status: '',
    image: ballsImage2,
    title: 'Reaction + Decision Test',
    description: reactionDecisionTestLang[current_lang].description,
  },
  {
    link: '/games/two_hands_coordination',
    status: 'danger',
    image: ballsImage2,
    title: 'Two–Hands Coordination',
    description: 'Description.',
  },
  {
    link: '/games/keyboard_mouse_coordination',
    status: 'done',
    image: '',
    title: 'Keyboard–Mouse Coordination',
    description: keyboardMouseCoordinationLang[current_lang].Menu.description,
  },
  {
    link: '/games/keys_reaction_test',
    status: 'done',
    image: '',
    title: 'Keys Reaction Test',
    description: keysReactionTestLang[current_lang].Menu.description,
  },
  {
    link: '/games/mouse_tracking',
    status: 'done',
    image: '',
    title: 'Mouse Tracking',
    description: mouseTrackingLang[current_lang].Menu.description,
  },
  {
    link: '/games/mouse_aiming',
    status: 'done',
    image: '',
    title: 'Mouse Aiming',
    description: mouseAimingLang[current_lang].Menu.description,
  },
  {
    link: '/games/optimal_trajectory',
    status: 'done',
    image: '',
    title: 'Optimal Trajectory',
    description: optimalTrajectoryLang[current_lang].Menu.description,
  },
];

for (const game in games) {
  if (Object.prototype.hasOwnProperty.call(games, game)) {
    games[game].id = game;
  }
}

export default games;
