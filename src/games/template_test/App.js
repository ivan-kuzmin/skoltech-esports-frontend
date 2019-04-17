import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import Inputs from './components/Inputs';
import Result from './components/Result';
import lang from './lang';
import sketch from './sketch';

const config = {
  name: 'template_test',
  exampleConfig: 5,
  // put here your test configs
};

class App extends BaseApp {
  state = {
    name: config.name,
    isLoading: true,
    current_lang: this.props.cookies.get('language') || 'en',
    results: [],
    newGame: false,
    game: {
      exampleConfig: config.exampleConfig,
      playedGames: 0,
      countOfGames: 5,
      sensitivity: 4.3,
    },
  }

  generateResult = () => {
    const { results, user } = this.state;
    const { playedGames, countOfGames, exampleConfig } = this.state.game;

    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      exampleConfig,
    };
    // 500 – delay after saving results
    this.checkNewGame([result, ...results], 500);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
