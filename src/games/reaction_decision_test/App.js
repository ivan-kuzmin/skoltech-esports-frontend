import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import lang from './lang';
import Inputs from './components/Inputs';
import Result from './components/Result';
import sketch from './sketch';

class App extends BaseApp {
  state = {
    name: 'reaction_decision_test',
    isLoading: true,
    current_lang: this.props.cookies.get('language') || 'en',
    results: [],
    newGame: false,
    game: {
      radius: 70,
      playedGames: 0,
      countOfGames: 5,
      startTime: 2,
      gameTime: 5,
    },
  };

  generateResult = (time, success, correct_result, color, x, y) => {
    const { results, user, game } = this.state;

    const result = {
      id: results.length,
      user: user ? user.email : 'Unknown user',
      success,
      time_reaction: time,
      radius: game.radius,
      correct_result,
      color,
      ball: { x, y },
      date: this.getCurrentDate(),
    };
    this.checkNewGame([result, ...results]);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
