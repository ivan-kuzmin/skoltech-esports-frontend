import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import Inputs from './components/Inputs';
import Result from './components/Result';
import lang from './lang';
import sketch from './sketch';

class App extends BaseApp {
  state = {
    isLoading: true,
    current_lang: this.props.cookies.get('language') || 'en',
    results: [],
    newGame: false,
    game: {
      speed: 3,
      radius: 30,
      ballsCount: 5,
      keyboardStep: 10,
      playedGames: 0,
      countOfGames: 5,
      sensitivity: 4.3,
      startTime: 0.5,
    },
  }

  generateResult = (time, mode) => {
    const { results, user } = this.state;
    const {
      playedGames, countOfGames, speed, radius, ballsCount, keyboardStep, sensitivity,
    } = this.state.game;

    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      time,
      mode,
      speed,
      radius,
      ballsCount,
      keyboardStep,
      sensitivity,
    };
    this.checkNewGame([result, ...results], 500);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
