import React from 'react';
import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import Filter from 'src/games/balls/components/Filter';
import P5Wrapper from 'src/games/balls/P5Wrapper';
import lang from './lang';
import Menu from './components/Menu';
import Result from './components/Result';
import sketch from './sketch';

class App extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      url: 'http://localhost:8000/reaction_test/results/',
      token: this.props.cookies.get('token'),
      user: { username: '' },
      current_lang: this.props.cookies.get('language') || 'en',
      newGame: false,
      level: 1,
      radius: 150,
      leftMouseMode: true,
      playedGames: 0,
      countOfGames: 5,
      startTime: 2,
      gameTime: 5,
    };
  }

  saveResultSuccess = (data) => {
    const { startNewGame, playedGames, countOfGames } = this.state;
    const { results } = data;
    const newGame = (playedGames < countOfGames);
    const count = (playedGames >= countOfGames) ? 0 : (playedGames + 1);
    this.setState({ newGame, playedGames: count, results }, () => {
      if (newGame) { startNewGame(); }
    });
  }

  getUserSuccess = (data) => {
    const { username, results } = data;
    this.setState({
      status: true,
      user: { username },
      results,
    });
  }

  generateResult = (time) => {
    const { level, radius, leftMouseMode } = this.state;
    const result = {
      success: time !== 0,
      time_reaction: time,
      level,
      radius,
      mode: leftMouseMode ? 'Left Mouse' : 'Space',
    };
    this.saveResult(result);
  }

  newGameButtonClick = () => {
    const { startNewGame } = this.state;
    let { playedGames } = this.state;
    playedGames = 1;
    this.setState({ newGame: true, playedGames }, startNewGame);
  }

  toggleMode = () => {
    this.setState(state => ({ leftMouseMode: !state.leftMouseMode }));
  }

  changeGameSettings = (event, name) => {
    this.setState({ [name]: +event.target.value });
  }

  render() {
    const { current_lang } = this.state;

    return (
      <div className="w-100 h-100 d-flex">
        <Menu
          {...this.state}
          toggleMode={this.toggleMode}
          changeGameSettings={this.changeGameSettings}
          newGameButtonClick={this.newGameButtonClick}
          goHome={this.goHome}
        />
        <Filter
          {...this.state}
          lang={lang[current_lang]}
          changeLanguage={this.changeLanguage}
          Result={Result}
        />
        <P5Wrapper
          p5Props={{ ...this.state, generateResult: this.generateResult }}
          sketch={sketch}
          onSetAppState={this.onSetAppState}
        />
      </div>
    );
  }
}

export default withCookies(App);
