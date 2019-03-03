import React from 'react';
import { withCookies } from 'react-cookie';
import { lang } from './lang';
import { App as BallsApp } from 'src/games/balls/App';
import Menu from './components/Menu';
import Filter from 'src/games/balls/components/Filter';
import Result from './components/Result';
import P5Wrapper from 'src/games/balls/P5Wrapper';
import sketch from './sketch';

class App extends BallsApp {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      url: "http://localhost:8000/reaction_test/results/",
      token: this.props.cookies.get("token"),
      user: { username: "" },
      current_lang: this.props.cookies.get("language") || "en",
      newGame: true,
      level: 1,
      radius: 50,
      playedGames: 0,
      countOfGames: 5,
    };
  }

  newGameButtonClick = () => {
    const { startNewGame } = this.state;
    this.setState({ newGame: true }, startNewGame);
  }

  render() {
    const { level, radius, current_lang, status, user, results, newGame, token } = this.state
    return (
      <div className="w-100 h-100 d-flex">
        <Menu
          token={token}
          current_level={{ level }}
          radius={radius}
          lang={lang[current_lang]}
          newGameButtonClick={this.newGameButtonClick}
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
            radius,
            generateResult: this.generateResult
          }}
          sketch={sketch}
          onSetAppState={this.onSetAppState}
        />
      </div>
    )
  }
}

export default withCookies(App);
