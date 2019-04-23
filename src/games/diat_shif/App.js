import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import { lang } from './lang';
import Inputs from './components/Inputs';
import Result from './components/Result';
import sketch from './sketch/index_ed2';

class App extends BaseApp {
  state = {
    name: 'simultaneity_test',
    isLoading: true,
    current_lang: this.props.cookies.get('language') || 'en',
    results: [],
    newGame: false,
    game: {
      sensitivity: 4.3,
      playedGames: 0,
      countOfGames: 5,
    },
  };

  generateResult = (gl_score, song_cl_score) => {
    const { results, user } = this.state;
    const { playedGames, countOfGames, sensitivity } = this.state.game;

    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      sensitivity,
      scores: {
        gl: gl_score,
        song_cl: song_cl_score,
      },
    };
    this.checkNewGame([result, ...results], 500);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
