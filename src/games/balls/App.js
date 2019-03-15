import React from 'react';
import { withCookies } from 'react-cookie';
import BaseApp from './BaseApp';
import Menu from './components/Menu';
import Inputs from './components/Inputs';
import Filter from './components/Filter';
import Result from './components/Result';
import P5Wrapper from './P5Wrapper';
import sketch from './P5Wrapper/sketch';
import lang from './lang';

export class App extends BaseApp {
  state = {
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

  render() {
    const {
      newGame, current_lang, results, user, isLoading, game,
    } = this.state;

    return (
      <div className="w-100 h-100 d-flex">
        <Menu
          lang={lang[current_lang]}
          newGameButtonClick={this.newGameButtonClick}
          goHome={this.goHome}
        >
          <Inputs {...game} current_lang={current_lang} changeGameSettings={this.changeGameSettings} />
        </Menu>
        <Filter
          newGame={newGame}
          user={user}
          results={results}
          isLoading={isLoading}
          current_lang={current_lang}
          lang={lang[current_lang]}
          changeLanguage={this.changeLanguage}
          Result={Result}
        />
        <P5Wrapper
          p5Props={{ newGame, generateResult: this.generateResult, ...game }}
          sketch={sketch}
          onSetAppState={this.onSetAppState}
        />
      </div>
    );
  }
}

export default withCookies(App);
