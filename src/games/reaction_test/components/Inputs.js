import React from 'react';
import PropTypes from 'prop-types';
import { Input, ButtonGroup, Button } from 'reactstrap';
import lang from '../lang';

const Menu = (props) => {
  const {
    countOfGames,
    changeGameSettings,
    current_lang,
    leftMouseMode,
    toggleMode,
  } = props;

  return (
    <>
      <div className="btn-group btn-group-sm btn-group-toggle w-100 mb-2" data-toggle="buttons">
        <ButtonGroup className="w-100 small" size="sm" onClick={toggleMode}>
          <Button className={`btn-warning w-50 ${leftMouseMode ? 'active' : ''}`}>Left Mouse</Button>
          <Button className={`btn-warning w-50 ${leftMouseMode ? '' : 'active'}`}>Space</Button>
        </ButtonGroup>
      </div>
      <div className="small mt-3">
        {`${lang[current_lang].count_of_trials}: ${countOfGames}`}
        <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} name="countOfGames" onChange={changeGameSettings} />
      </div>
    </>
  );
};

Menu.propTypes = {
  current_lang: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
  leftMouseMode: PropTypes.bool.isRequired,
  countOfGames: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Menu;
