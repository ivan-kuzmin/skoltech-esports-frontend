import React from 'react';
import { Background } from 'src/games/balls/components/Menu';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Inputs from './Inputs';
import { lang } from '../lang';

const Menu = (props) => {
  const {
    token,
    newGameButtonClick,
    current_lang,
    newGame,
  } = props;
  const { Menu: menu } = lang[current_lang];

  return (
    <Background visible={newGame ? 1 : 0} className="px-3 py-5">
      <div className="text-light mb-5">
        <h5 className="font-weight-bold text-center">{menu.header}</h5>
        <p className="small" dangerouslySetInnerHTML={{ __html: menu.description }} />
        <Inputs {...props} />
      </div>
      <Button hidden={!token} className="btn btn-warning w-100 mb-1 text-uppercase" onClick={newGameButtonClick}>
        {menu.new_game}
      </Button>
      <a href="/" role="button" className="btn btn-warning w-100 text-uppercase">
        {menu.home}
      </a>
    </Background>
  );
};

Menu.propTypes = {
  token: PropTypes.string,
  current_lang: PropTypes.string.isRequired,
  newGameButtonClick: PropTypes.func.isRequired,
  newGame: PropTypes.bool.isRequired,
  countOfGames: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Menu;
