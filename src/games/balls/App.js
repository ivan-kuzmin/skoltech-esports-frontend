import { withCookies } from 'react-cookie';
import BaseApp from './BaseApp';
import Inputs from './components/Inputs';
import Result from './components/Result';
import sketch from './P5Wrapper/sketch';
import lang from './lang';

class App extends BaseApp {
  state = {
    name: 'balls',
    isLoading: true,
    current_lang: this.props.cookies.get('language') || 'en',
    results: [],
    newGame: false,
    game: {
      ballsCount: 12,
      speed: 3,
      targetBallsCount: 4,
      radius: 50,
      playedGames: 0,
      countOfGames: 5,
    },
  };

  generateResult = (targetBalls, selectedBalls) => {
    const { results, user } = this.state;
    const {
      ballsCount, targetBallsCount, speed, radius,
    } = this.state.game;

    let trueBalls = 0;
    let falseBalls = 0;
    const clickedBalls = {};
    for (const ball of selectedBalls) {
      (ball.id >= ballsCount - targetBallsCount) ? (trueBalls += 1) : (falseBalls += 1);
      clickedBalls[ball.id] = { x: ball.x.toFixed(3), y: ball.y.toFixed(3) };
    }
    const success = trueBalls === targetBallsCount && falseBalls === 0;
    const result = {
      success, trueBalls, falseBalls, ballsCount, targetBallsCount, targetBalls, clickedBalls, speed, radius,
    };
    result.date = this.getCurrentDate();
    result.id = results.length;
    result.user = user ? user.email : 'Unknown user';
    this.checkNewGame([result, ...results]);
  };

  render() { return this.renderApp(lang, Inputs, Result, sketch); }
}

export default withCookies(App);
