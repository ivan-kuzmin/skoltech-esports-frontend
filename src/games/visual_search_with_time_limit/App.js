import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import { lang } from './lang';
import Inputs from './components/Inputs';
import Result from './components/Result';
import sketch from './sketch';

class App extends BaseApp {
  state = {
    name: 'visual_search_with_time_limit',
    isLoading: true,
    current_lang: this.props.cookies.get('language') || 'en',
    results: [],
    newGame: false,
    game: {
      matrixSize: 20,
      letterSize: 20,
      playedGames: 0,
      countOfGames: 5,
      startTime: 0.5,
      gameTime: 3,
    },
  };

  generateResult = (success, time) => {
    const { results, user } = this.state;
    const {
      playedGames, countOfGames, matrixSize, letterSize, gameTime,
    } = this.state.game;

    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      success,
      matrixSize,
      letterSize,
      gameTime,
      time,
    };
    this.checkNewGame([result, ...results]);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
