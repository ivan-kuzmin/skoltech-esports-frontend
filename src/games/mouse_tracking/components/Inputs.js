import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { lang } from '../lang';

const Inputs = (props) => {
  const {
    newGame,
    radius,
    countOfGames,
    sensitivity,
    changeGameSettings,
    current_lang,
  } = props;
  const { Inputs: inputs } = lang[current_lang];

  return (
    <div className="small mt-4 pt-2">
      {/* eslint-disable */}
      {`${inputs.radius}: ${radius}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="40" max="150" step="1" value={radius} onChange={e => changeGameSettings(e, 'radius')} />
      {`${inputs.count_of_trials}: ${countOfGames}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} onChange={e => changeGameSettings(e, 'countOfGames')} />
      {`${inputs.sensitivity}: ${sensitivity.toFixed(1)}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="15" step="0.1" value={sensitivity} onChange={e => changeGameSettings(e, 'sensitivity')} />
      {/* eslint-enable */}
    </div>
  );
};

Inputs.propTypes = {
  radius: PropTypes.number.isRequired,
  current_lang: PropTypes.string.isRequired,
  newGame: PropTypes.bool.isRequired,
  countOfGames: PropTypes.number.isRequired,
  sensitivity: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Inputs;
