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
      targetStringLength: 10,
      playedGames: 0,
      countOfGames: 5,
      startTime: 0,
      gameTime: 5,
    },
  };

  generateResult = (time, success, targetString, input) => {
    const { results, user } = this.state;
    const { playedGames, countOfGames, targetStringLength } = this.state.game;

    const string = {};
    for (let i=0; i<targetString.length; i++) {
      string[i] = targetString[i].value;
    }
    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      success,
      time,
      targetStringLength,
      string,
    };
    this.checkNewGame([result, ...results]);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
