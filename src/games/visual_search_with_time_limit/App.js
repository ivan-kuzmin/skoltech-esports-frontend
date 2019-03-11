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
      status: true,
      results: [], // only for default status true
      url: 'http://localhost:8000/visual_search_with_time_limit/results/',
      token: this.props.cookies.get('token'),
      user: { username: 'Unknown' },
      current_lang: this.props.cookies.get('language') || 'en',
      newGame: false,
      matrixSize: 20,
      letterSize: 20,
      playedGames: 0,
      countOfGames: 5,
      startTime: 0.5,
      gameTime: 3,
    };
  }

  getUserSuccess = (data) => {
    const { username, results } = data;
    let {
      matrixSize, letterSize, gameTime,
    } = this.state;
    if (results.length !== 0) {
      matrixSize = results[0].matrix_size;
      letterSize = results[0].letter_size;
      gameTime = results[0].game_time;
    }
    this.setState({
      status: true,
      user: { username },
      matrixSize,
      letterSize,
      gameTime,
      results,
    });
  }

  generateResult = (success, timeOfStart, timeOfEnd) => {
    const {
      playedGames, countOfGames, matrixSize, letterSize, gameTime, results,
    } = this.state;
    const time = ((timeOfEnd - timeOfStart) / 1000).toFixed(3);
    const result = {
      playedGames,
      countOfGames,
      success,
      matrixSize,
      letterSize,
      gameTime,
      time,
    };
    // this.saveResult(result);
    console.log(result);
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    result.created_at = `${dd}/${(mm < 10 ? '0' : '') + mm}/${yyyy}, ${hours}:${(minutes < 10 ? '0' : '') + minutes}`;
    result.id = results.length;
    results.unshift(result);
    this.saveResultSuccess({ results });
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
    const { level, current_lang } = this.state;
    const { generateResult } = this;
    return (
      <div className="w-100 h-100 d-flex">
        <Menu
          {...this.state}
          current_level={{ level }}
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
