import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import { lang } from './lang';
import Inputs from './components/Inputs';
import Result from './components/Result';
import sketch from './sketch';

class App extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      current_lang: this.props.cookies.get('language') || 'en',
      results: [],
      newGame: false,
      game: {
        speed: 3,
        radius: 70,
        playedGames: 0,
        countOfGames: 5,
        sensitivity: 4.3,
        startTime: 0.5,
        gameTime: 5,
        timeOnChangeSpeed: 1,
      },
    };
  }

  generateResult = (ballTrajectory, aimTrajectory) => {
    const { results, user } = this.state;
    const {
      playedGames, countOfGames, speed, radius, sensitivity,
    } = this.state.game;

    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      speed,
      radius,
      sensitivity,
      trajectories: {
        ball: ballTrajectory,
        aim: aimTrajectory,
      },
    };
    this.checkNewGame([result, ...results], 500);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
