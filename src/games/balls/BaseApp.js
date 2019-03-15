import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'src/games/balls/components/Menu';
import Filter from 'src/games/balls/components/Filter';
import P5Wrapper from 'src/games/balls/P5Wrapper';

class BaseApp extends Component {
  componentDidMount() {
    const { firebase } = this.props;
    this.firebaseListener = firebase.auth.onAuthStateChanged(user => this.setState({ user, isLoading: false }));
  }

  changeLanguage = () => {
    let { current_lang } = this.state;
    const { cookies } = this.props;
    current_lang = (current_lang === 'ru') ? 'en' : 'ru';
    cookies.set('language', current_lang, { path: '/' });
    this.setState({ current_lang });
  }

  goHome = () => {
    const url = window.location.href;
    window.location.href = url.split('games')[0];
  };

  newGameButtonClick = () => {
    const { startNewGame, game } = this.state;
    this.setState({ newGame: true, game: { ...game, playedGames: 1 } }, startNewGame);
  };

  onSetAppState = (newState, callback) => this.setState(newState, callback)

  changeGameSettings = (event) => {
    const { game } = this.state;
    this.setState({ game: { ...game, [event.target.name]: +event.target.value } });
  }

  getCurrentDate = () => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    return `${dd}/${(mm < 10 ? '0' : '') + mm}/${yyyy}, ${hours}:${(minutes < 10 ? '0' : '') + minutes}`;
  }

  checkNewGame = (results, latency=0) => {
    const { game, startNewGame } = this.state;

    const newGame = (game.playedGames < game.countOfGames);
    const playedGames = (game.playedGames >= game.countOfGames) ? 0 : (game.playedGames + 1);
    this.setState({ newGame, game: { ...game, playedGames }, results }, () => {
      if (newGame) {
        setTimeout(startNewGame, latency);
      } else {
        document.exitFullscreen();
        document.exitPointerLock();
      }
    });
  }

  renderApp(lang, Inputs, Result, sketch) {
    const {
      current_lang, game, newGame, user, results, isLoading,
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
            lang={lang[current_lang].Inputs}
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

BaseApp.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  firebase: PropTypes.object.isRequired,
};

export default BaseApp;
