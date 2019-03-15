import React from 'react';
import { withCookies } from 'react-cookie';
import P5Wrapper from 'src/games/balls/P5Wrapper';
import Menu from 'src/games/balls/components/Menu';
import Filter from 'src/games/balls/components/Filter';
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
      speed: 3,
      radius: 30,
      ballsCount: 5,
      keyboardStep: 10,
      playedGames: 0,
      countOfGames: 5,
      sensitivity: 4.3,
      startTime: 0.5,
    },
  }

  generateResult = (time, mode) => {
    const { results, user } = this.state;
    const {
      playedGames, countOfGames, speed, radius, ballsCount, keyboardStep, sensitivity,
    } = this.state.game;

    const result = {
      id: results.length,
      date: this.getCurrentDate(),
      user: user ? user.email : 'Unknown user',
      playedGames,
      countOfGames,
      time,
      mode,
      speed,
      radius,
      ballsCount,
      keyboardStep,
      sensitivity,
    };
    this.checkNewGame([result, ...results], 500);
  }

  render() {
    const {
      level, current_lang, game, newGame, user, results, isLoading,
    } = this.state;
    
    return (
      <div className="w-100 h-100 d-flex">
        <Menu
          lang={lang[current_lang].Menu}
          newGameButtonClick={this.newGameButtonClick}
          goHome={this.goHome}
        >
          <Inputs
            {...game}
            current_lang={current_lang}
            toggleMode={this.toggleMode}
            changeGameSettings={this.changeGameSettings}
          />
        </Menu>
        <Filter
          newGame={newGame}
          user={user}
          results={results}
          isLoading={isLoading}
          current_lang={current_lang}
          lang={lang[current_lang].Filter}
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
