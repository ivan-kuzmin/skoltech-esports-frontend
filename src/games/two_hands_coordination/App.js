import React from 'react';
import { withCookies } from 'react-cookie';
import BaseApp from 'src/games/balls/BaseApp';
import Filter from 'src/games/balls/components/Filter';
import Menu from './components/Menu';
import Result from './components/Result';
import P5Wrapper from 'src/games/balls/P5Wrapper';
import sketch from './sketch';
import { lang } from './lang';

export class App extends BaseApp {
  constructor(props) {
    super(props)
    this.state = {
      status: false,
      url: 'http://localhost:8000/balls/results/',
      token: this.props.cookies.get('token'),
      user: {username: ""},
      current_lang: this.props.cookies.get('language') || 'en',
      newGame: true,
      sensitivity: 4.3,
    }
  }

  getUserSuccess = (data) => {
    this.setState({
      status: true,
      user: {username: data.username},
      level: data.current_level.level,
      results: data.results,
    })
  }

  generateResult = () => {
    const result = {}
    this.saveResult(result)
  }

  saveResultSuccess = (data) => {
    const { level, balls, speed, red_balls } = data.current_level
    this.setState({ level, ballsCount: balls, speed, targetBalls: red_balls, results: data.results }, () => {
      // new game
    })
  }

  newGameButtonClick = () => {
    const { startNewGame } = this.state
    this.setState({ newGame: true }, startNewGame)
  }

  render() {
    const {
      current_lang,
      status,
      user,
      token,
      newGame,
      level,
      results,
      sensitivity,
    } = this.state
    return (
      <div className="w-100 h-100 d-flex">
        <Menu
          token={token}
          current_level={{ level }}
          lang={lang[current_lang]}
          newGameButtonClick={this.newGameButtonClick}
          goHome={this.goHome}
        />
        <Filter
          newGame={newGame}
          user={user}
          results={results}
          status={status}
          current_lang={current_lang}
          lang={lang[current_lang]}
          changeLanguage={this.changeLanguage}
          Result={Result}
        />
        <P5Wrapper
          p5Props={{
            newGame,
            level,
            generateResult: this.generateResult,
            sensitivity,
          }}
          sketch={sketch}
          onSetAppState={this.onSetAppState}
        />
      </div>
    )
  }
};

export default withCookies(App);
