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
      radius: 150,
      leftMouseMode: 1,
      playedGames: 0,
      countOfGames: 5,
      startTime: 2,
      gameTime: 5,
    },
  };

  generateResult = (time) => {
    const { results, user, game } = this.state;

    const result = {
      id: results.length,
      user: user ? user.email : 'Unknown user',
      success: time !== 0,
      time_reaction: time.toFixed(3),
      radius: game.radius,
      mode: game.leftMouseMode ? 'Left Mouse' : 'Space',
      date: this.getCurrentDate(),
    };
    this.checkNewGame([result, ...results]);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
