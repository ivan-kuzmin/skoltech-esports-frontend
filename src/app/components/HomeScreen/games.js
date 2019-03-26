import ballsLang from 'src/games/balls/lang';
import reactionTestLang from 'src/games/reaction_test/lang';
import reactionDecisionTestLang from 'src/games/reaction_decision_test/lang';
import keyboardMouseCoordinationLang from 'src/games/keyboard_mouse_coordination/lang';
import keysReactionTestLang from 'src/games/keys_reaction_test/lang';
import mouseTrackingLang from 'src/games/mouse_tracking/lang';
import mouseAimingLang from 'src/games/mouse_aiming/lang';
import optimalTrajectoryLang from 'src/games/optimal_trajectory/lang';
import visualSearchWithTimeLimitLang from 'src/games/visual_search_with_time_limit/lang';
import diatShifLang from 'src/games/diat_shif/lang';
import focuShifLang from 'src/games/focu_shif/lang';
import restInshLang from 'src/games/rest_insh/lang';
import restHecoorLang from 'src/games/rest_hecoor/lang';
import womRestLang from 'src/games/wom_rest/lang';
import expandingBallLang from 'src/games/expanding_ball/lang';
import memoryTestLang from 'src/games/memory_test/lang';
import ballsImage from './balls.png';
import ballsImage1 from './balls1.png';
import ballsImage2 from './balls2.png';

function gamesList(current_lang) {
  const games = [
    {
      link: 'games/balls',
      status: 'done',
      image: ballsImage,
      title: 'Balls',
      description: ballsLang[current_lang].Menu.description,
    },
    {
      link: 'games/reaction_test',
      status: 'done',
      image: ballsImage1,
      title: 'Reaction test',
      description: reactionTestLang[current_lang].Menu.description,
    },
    {
      link: 'games/reaction_decision_test',
      status: 'done',
      image: ballsImage2,
      title: 'Reaction + Decision Test',
      description: reactionDecisionTestLang[current_lang].Menu.description,
    },
    // {
    //   link: 'games/two_hands_coordination',
    //   status: 'danger',
    //   image: ballsImage2,
    //   title: 'Two–Hands Coordination',
    //   description: 'Description.',
    // },
    {
      link: 'games/keyboard_mouse_coordination',
      status: 'done',
      image: '',
      title: 'Keyboard–Mouse Coordination',
      description: keyboardMouseCoordinationLang[current_lang].Menu.description,
    },
    {
      link: 'games/keys_reaction_test',
      status: 'done',
      image: '',
      title: 'Keys Reaction Test',
      description: keysReactionTestLang[current_lang].Menu.description,
    },
    {
      link: 'games/mouse_tracking',
      status: 'done',
      image: '',
      title: 'Mouse Tracking',
      description: mouseTrackingLang[current_lang].Menu.description,
    },
    {
      link: 'games/mouse_aiming',
      status: 'done',
      image: '',
      title: 'Mouse Aiming',
      description: mouseAimingLang[current_lang].Menu.description,
    },
    {
      link: 'games/optimal_trajectory',
      status: 'done',
      image: '',
      title: 'Optimal Trajectory',
      description: optimalTrajectoryLang[current_lang].Menu.description,
    },
    {
      link: 'games/visual_search_with_time_limit',
      status: 'done',
      image: '',
      title: 'Visual Search with Time Limit',
      description: visualSearchWithTimeLimitLang[current_lang].Menu.description,
    },
    // {
    //   link: 'games/expanding_ball',
    //   status: '',
    //   image: '',
    //   title: 'Expanding Ball',
    //   description: expandingBallLang[current_lang].Menu.description,
    // },
    {
      link: 'games/memory_test',
      status: 'done',
      image: '',
      title: 'Memory Test',
      description: memoryTestLang[current_lang].Menu.description,
    },
    {
      link: 'games/diat_shif',
      status: 'done',
      image: '',
      title: 'DIAT-SHIF',
      description: diatShifLang[current_lang].Menu.description,
    },
    {
      link: 'games/focu_shif',
      status: 'done',
      image: '',
      title: 'FOCU-SHIF',
      description: focuShifLang[current_lang].Menu.description,
    },
    {
      link: 'games/rest_insh',
      status: 'done',
      image: '',
      title: 'REST-INSH',
      description: restInshLang[current_lang].Menu.description,
    },
    {
      link: 'games/rest_hecoor',
      status: 'done',
      image: '',
      title: 'REST-HECOOR',
      description: restHecoorLang[current_lang].Menu.description,
    },
    {
      link: 'games/wom_rest',
      status: 'done',
      image: '',
      title: 'WOM-REST',
      description: womRestLang[current_lang].Menu.description,
    },
  ];

  for (const game in games) {
    if (Object.prototype.hasOwnProperty.call(games, game)) {
      games[game].id = game;
    }
  }

  return games;
}

export default gamesList;
