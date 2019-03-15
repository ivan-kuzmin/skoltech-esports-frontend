import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const Inputs = (props) => {
  const {
    speed,
    radius,
    ballsCount,
    countOfGames,
    sensitivity,
    changeGameSettings,
    lang,
    keyboardStep,
  } = props;

  return (
    <div className="small mt-4 pt-2">
      {`${lang.speed}: ${speed}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="30" step="1" value={speed} name="speed" onChange={changeGameSettings} />
      {`${lang.radius}: ${radius}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="20" max="50" step="1" value={radius} name="radius" onChange={changeGameSettings} />
      {`${lang.count_of_balls}: ${ballsCount}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="30" step="1" value={ballsCount} name="ballsCount" onChange={changeGameSettings} />
      {`${lang.count_of_trials}: ${countOfGames}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} name="countOfGames" onChange={changeGameSettings} />
      {`${lang.sensitivity}: ${sensitivity.toFixed(1)}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="15" step="0.1" value={sensitivity} name="sensitivity" onChange={changeGameSettings} />
      {`${lang.keyboard_step}: ${keyboardStep}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="40" step="1" value={keyboardStep} name="keyboardStep" onChange={changeGameSettings} />
    </div>
  );
};

Inputs.propTypes = {
  radius: PropTypes.number.isRequired,
  lang: PropTypes.PropTypes.objectOf(PropTypes.string).isRequired,
  speed: PropTypes.number.isRequired,
  ballsCount: PropTypes.number.isRequired,
  countOfGames: PropTypes.number.isRequired,
  sensitivity: PropTypes.number.isRequired,
  keyboardStep: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Inputs;
