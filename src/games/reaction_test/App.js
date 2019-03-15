import React from 'react';
import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import Menu from 'src/games/balls/components/Menu';
import Filter from 'src/games/balls/components/Filter';
import P5Wrapper from 'src/games/balls/P5Wrapper';
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
      leftMouseMode: true,
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

  toggleMode = () => { this.setState(state => ({ game: { ...state.game, leftMouseMode: !state.game.leftMouseMode } })); }

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
