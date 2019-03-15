import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import lang from './lang';
import Inputs from './components/Inputs';
import Result from './components/Result';
import sketch from './sketch';

class App extends BaseApp {
  state = {
    isLoading: true,
    current_lang: this.props.cookies.get('language') || 'en',
    results: [],
    newGame: false,
    game: {
      radius: 70,
      playedGames: 0,
      countOfGames: 5,
      sensitivity: 4.3,
      startTime: 2,
    },
  };

  generateResult = (ballX, ballY, aimTrajectory, time, success) => {
    const { results, user } = this.state;
    const {
      playedGames, countOfGames, radius, sensitivity,
    } = this.state.game;

    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      radius,
      sensitivity,
      time,
      success,
      ball: {
        x: ballX,
        y: ballY,
      },
      trajectories: {
        aim: aimTrajectory,
      },
    };
    this.checkNewGame([result, ...results]);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
