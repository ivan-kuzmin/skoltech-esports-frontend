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
      playedGames: 0,
      countOfGames: 5,
      startTime: 0.5,
    },
  };

  generateResult = (success, ball) => {
    const { results, user } = this.state;
    const { playedGames, countOfGames } = this.state.game;

    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      success,
      startRadius: ball.startRadius,
      ballRadius: ball.radius,
      contourRadius: ball.contour,
      speed: ball.speed,
    };
    this.checkNewGame([result, ...results], 500);
  }

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
