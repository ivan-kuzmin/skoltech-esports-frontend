import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import { lang } from './lang';
import Inputs from './components/Inputs';
import Result from './components/Result';
import sketch from './sketch';

class App extends BaseApp {
  state = {
    name: 'memory_test',
    isLoading: true,
    current_lang: this.props.cookies.get('language') || 'en',
    results: [],
    newGame: false,
    game: {
      matrixSize: 8,
      cellSize: 80,
      countOfTargets: 5,
      playedGames: 0,
      countOfGames: 5,
      startTime: 1,
    },
  };

  generateResult = (success, clicked, targets) => {
    const { results, user } = this.state;
    const {
      playedGames, countOfGames, matrixSize, cellSize, gameTime,
    } = this.state.game;

    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      success,
      matrixSize,
      cellSize,
      clicked,
      targets,
      gameTime,
    };
    this.checkNewGame([result, ...results]);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
