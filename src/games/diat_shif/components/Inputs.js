import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const Inputs = (props) => {
  const {
    countOfGames,
    sensitivity,
    changeGameSettings,
    lang,
  } = props;

  return (
    <div className="small mt-4 pt-2">
      {/* {`${lang.radius}: ${radius}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="40" max="150" step="1" value={radius} name="radius" onChange={changeGameSettings} /> */}
      {`${lang.count_of_trials}: ${countOfGames}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} name="countOfGames" onChange={changeGameSettings} />
      {`${lang.sensitivity}: ${sensitivity.toFixed(1)}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="15" step="0.1" value={sensitivity} name="sensitivity" onChange={changeGameSettings} />
    </div>
  );
};

Inputs.propTypes = {
  lang: PropTypes.PropTypes.objectOf(PropTypes.string).isRequired,
  countOfGames: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
  sensitivity: PropTypes.number.isRequired,
};

export default Inputs;
