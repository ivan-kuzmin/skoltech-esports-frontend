import React from 'react';
import { withCookies } from 'react-cookie';
import P5Wrapper from 'src/games/balls/P5Wrapper';
import Filter from 'src/games/balls/components/Filter';
import BaseApp from 'src/games/balls/BaseApp';
import { closeFullscreen } from 'src/assets/js/fullScreen';
import lang from './lang';
import Menu from './components/Menu';
import Result from './components/Result';
import sketch from './sketch';

class App extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      url: 'http://localhost:8000/keyboard_mouse_coordination/results/',
      token: this.props.cookies.get('token'),
      user: { username: '' },
      current_lang: this.props.cookies.get('language') || 'en',
      newGame: false,
      level: 1,
      speed: 3,
      radius: 30,
      ballsCount: 5,
      keyboardStep: 10,
      playedGames: 0,
      countOfGames: 5,
      sensitivity: 4.3,
      startTime: 0.5,
    };
  }

  getUserSuccess = (data) => {
    const { username, results } = data;
    let {
      speed, radius, ballsCount, sensitivity,
    } = this.state;
    if (results.length !== 0) {
      speed = results[0].speed;
      radius = results[0].radius;
      ballsCount = results[0].balls;
      sensitivity = results[0].sensitivity;
    }
    this.setState({
      status: true,
      user: { username },
      speed,
      radius,
      ballsCount,
      sensitivity,
      results,
    });
  }

  generateResult = (timeOfStart, timeOfEnd, mode) => {
    const {
      playedGames, countOfGames, speed, radius, ballsCount, keyboardStep, sensitivity,
    } = this.state;
    const time = ((timeOfEnd - timeOfStart)/1000).toFixed(3);
    const result = {
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
    this.saveResult(result);
  }

  saveResultSuccess = (data) => {
    const { startNewGame, playedGames, countOfGames } = this.state;
    const { results } = data;
    setTimeout(() => {
      const newGame = (playedGames < countOfGames);
      const count = (playedGames >= countOfGames) ? 0 : (playedGames + 1);
      this.setState({ newGame, playedGames: count, results }, () => {
        if (newGame) { startNewGame(); } else {
          document.exitPointerLock();
          closeFullscreen();
        }
      });
    }, 500);
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
    const { level, current_lang } = this.state;
    const { generateResult } = this;
    return (
      <div className="w-100 h-100 d-flex">
        <Menu
          {...this.state}
          current_level={{ level }}
          newGameButtonClick={this.newGameButtonClick}
          changeGameSettings={this.changeGameSettings}
          goHome={this.goHome}
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
