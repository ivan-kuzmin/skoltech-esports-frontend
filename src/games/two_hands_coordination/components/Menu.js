import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Background } from 'src/games/balls/components/Menu';

const Menu = (props) => {
  const {
 lang, token, current_level, newGameButtonClick, goHome 
} = props;
  return (
    <Background id="menu" className="px-3 py-5">
      <div className="text-light mb-5">
        <h5 className="font-weight-bold text-center">{lang.header}</h5>
        <p className="small" dangerouslySetInnerHTML={{ __html: lang.description }} />
      </div>
      <div className="text-light mb-5">
        <h5 className="font-weight-bold text-center">{`${lang.current_level} – ${current_level.level}:`}</h5>
        {/* <div>{`${lang.balls}: ${current_level.balls}`}</div>
        <div>{`${lang.speed}: ${current_level.speed}`}</div>
        <div>{`${lang.red_balls}: ${current_level.red_balls}`}</div>
        <div>{`${lang.balls_radius}: ${radius}`}</div> */}
      </div>
      <Button hidden={!token} className="btn btn-warning w-100 mb-1 text-uppercase" id="newGameButton" onClick={newGameButtonClick}>{lang.new_game}</Button>
      <Button onClick={goHome} className="btn btn-warning w-100 text-uppercase">{lang.home}</Button>
    </Background>
  );
};

Menu.propTypes = {
  token: PropTypes.string,
  current_level: PropTypes.objectOf(PropTypes.number).isRequired,
  lang: PropTypes.object.isRequired,
  newGameButtonClick: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired,
};

export default Menu;
