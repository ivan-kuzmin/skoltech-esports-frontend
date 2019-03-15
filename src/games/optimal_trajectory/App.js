import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import { lang } from './lang';
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
      ballsCount: 4,
      radius: 40,
      playedGames: 0,
      countOfGames: 5,
      sensitivity: 4.3,
      startTime: 0.5,
    },
  };

  generateResult = (balls, clicks, aimTrajectory, time) => {
    const { results, user } = this.state;
    const {
      playedGames, countOfGames, radius, ballsCount, sensitivity,
    } = this.state.game;

    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      radius,
      ballsCount,
      sensitivity,
      time,
      balls,
      clicks,
      trajectories: {
        aim: aimTrajectory,
      },
    };
    this.checkNewGame([result, ...results]);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
