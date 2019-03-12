import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Input } from 'reactstrap';
import styled from 'styled-components';
import lang from '../lang';

const Background = styled.div`
  background: rgb(8, 0, 47);
  height: 100%;
  flex: 0 0 20%;
  max-width: 20%;
  overflow: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Menu = (props) => {
  const {
    token,
    newGameButtonClick,
    current_lang,
    toggleMode,
    leftMouseMode,
    countOfGames,
    newGame,
    changeGameSettings,
    goHome,
  } = props;

  return (
    <Background id="menu" className="px-3 py-5">
      <div className="text-light mb-5">
        <h5 className="font-weight-bold text-center">{lang[current_lang].header}</h5>
        <p className="small" dangerouslySetInnerHTML={{ __html: lang[current_lang].description }} />
        <div className="btn-group btn-group-sm btn-group-toggle w-100 mb-2" data-toggle="buttons">
          <ButtonGroup className="w-100 small" size="sm" onClick={toggleMode}>
            <Button className={`btn-warning w-50 ${leftMouseMode ? 'active' : ''}`}>Left Mouse</Button>
            <Button className={`btn-warning w-50 ${leftMouseMode ? '' : 'active'}`}>Space</Button>
          </ButtonGroup>
        </div>
        <div className="small mt-3">
          {`${lang[current_lang].count_of_trials}: ${countOfGames}`}
          <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} onChange={e => changeGameSettings(e, 'countOfGames')} />
        </div>
      </div>
      <Button hidden={!token} className="btn btn-warning w-100 mb-1 text-uppercase" onClick={newGameButtonClick}>{lang[current_lang].new_game}</Button>
      <Button onClick={goHome} className="btn btn-warning w-100 text-uppercase">{lang[current_lang].home}</Button>
    </Background>
  );
};

Menu.propTypes = {
  token: PropTypes.string,
  current_lang: PropTypes.string.isRequired,
  newGameButtonClick: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
  leftMouseMode: PropTypes.bool.isRequired,
  countOfGames: PropTypes.number.isRequired,
  newGame: PropTypes.bool.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired,
};

export default Menu;
