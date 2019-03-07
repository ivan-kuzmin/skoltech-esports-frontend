import React from 'react';
import { withCookies } from 'react-cookie';
import P5Wrapper from 'src/games/balls/P5Wrapper';
import Filter from 'src/games/balls/components/Filter';
import BaseApp from 'src/games/balls/BaseApp';
import { lang } from './lang';
import Menu from './components/Menu';
import Result from './components/Result';
import sketch from './sketch';

class App extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      url: 'http://localhost:8000/keys_reaction_test/results/',
      token: this.props.cookies.get('token'),
      user: { username: '' },
      current_lang: this.props.cookies.get('language') || 'en',
      newGame: false,
      targetStringLength: 10,
      playedGames: 0,
      countOfGames: 5,
      startTime: 0,
      gameTime: 5,
    };
  }

  getUserSuccess = (data) => {
    const { username, results } = data;
    let { targetStringLength } = this.state;
    if (results.length !== 0) { targetStringLength = results[0].string_length; }
    this.setState({
      status: true,
      user: { username },
      targetStringLength,
      results,
    });
  }

  generateResult = (timeOfEnd, timeOfStart, targetString, input) => {
    const {
      playedGames, countOfGames, targetStringLength, gameTime,
    } = this.state;
    const time = (timeOfEnd - timeOfStart)/1000;
    const success = time < gameTime;
    const string = {};
    for (let i=0; i<targetString.length; i++) {
      string[i] = targetString[i].value;
    }
    const result = {
      playedGames,
      countOfGames,
      success,
      time,
      string_length: targetStringLength,
      string,
    };
    // this.saveResult(result);
    console.log(result);
    this.saveResultSuccess([]);
  }

  saveResultSuccess = (data) => {
    const { startNewGame, playedGames, countOfGames } = this.state;
    const { results } = data;
    const newGame = (playedGames < countOfGames);
    const count = (playedGames >= countOfGames) ? 0 : (playedGames + 1);
    this.setState({ newGame, playedGames: count, results }, () => {
      if (newGame) { startNewGame(); } else {
        document.exitFullscreen();
      }
    });
  }

  newGameButtonClick = () => {
    const { startNewGame } = this.state;
    let { playedGames } = this.state;
    playedGames = 1;
    this.setState({ newGame: true, playedGames }, startNewGame);
  }

  changeGameSettings = (event, name) => {
    this.setState({ [name]: +event.target.value });
  }

  render() {
    const { current_lang } = this.state;
    const { generateResult } = this;
    return (
      <div className="w-100 h-100 d-flex">
        <Menu
          {...this.state}
          newGameButtonClick={this.newGameButtonClick}
          changeGameSettings={this.changeGameSettings}
        />
        <Filter
          {...this.state}
          lang={lang[current_lang].Filter}
          changeLanguage={this.changeLanguage}
          Result={Result}
        />
        <P5Wrapper
          p5Props={{ ...this.state, generateResult }}
          sketch={sketch}
          onSetAppState={this.onSetAppState}
        />
      </div>
    );
  }
}

export default withCookies(App);
