import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import lang from '../lang';

const Inputs = (props) => {
  const {
    newGame,
    speed,
    radius,
    ballsCount,
    countOfGames,
    sensitivity,
    changeGameSettings,
    current_lang,
    keyboardStep,
  } = props;
  const { Inputs: inputs } = lang[current_lang];

  return (
    <div className="small mt-4 pt-2">
      {/* eslint-disable */}
      {`${inputs.speed}: ${speed}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="30" step="1" value={speed} onChange={e => changeGameSettings(e, 'speed')} />
      {`${inputs.radius}: ${radius}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="20" max="50" step="1" value={radius} onChange={e => changeGameSettings(e, 'radius')} />
      {`${inputs.count_of_balls}: ${ballsCount}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="30" step="1" value={ballsCount} onChange={e => changeGameSettings(e, 'ballsCount')} />
      {`${inputs.count_of_trials}: ${countOfGames}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} onChange={e => changeGameSettings(e, 'countOfGames')} />
      {`${inputs.sensitivity}: ${sensitivity.toFixed(1)}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="15" step="0.1" value={sensitivity} onChange={e => changeGameSettings(e, 'sensitivity')} />
      {`${inputs.keyboard_step}: ${keyboardStep}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="40" step="1" value={keyboardStep} onChange={e => changeGameSettings(e, 'keyboardStep')} />
      {/* eslint-enable */}
    </div>
  );
};

Inputs.propTypes = {
  radius: PropTypes.number.isRequired,
  current_lang: PropTypes.string.isRequired,
  newGame: PropTypes.bool.isRequired,
  speed: PropTypes.number.isRequired,
  ballsCount: PropTypes.number.isRequired,
  countOfGames: PropTypes.number.isRequired,
  sensitivity: PropTypes.number.isRequired,
  keyboardStep: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Inputs;
