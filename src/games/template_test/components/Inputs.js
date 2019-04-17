import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const Inputs = (props) => {
  const {
    exampleConfig, // 1
    countOfGames,
    sensitivity,
    changeGameSettings,
    lang,
  } = props;

  return (
    <div className="small mt-4 pt-2">
      {/* 2 */}
      {`${lang.exampleConfig}: ${exampleConfig}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="30" step="1" value={exampleConfig} name="exampleConfig" onChange={changeGameSettings} />
      {`${lang.count_of_trials}: ${countOfGames}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} name="countOfGames" onChange={changeGameSettings} />
      {`${lang.sensitivity}: ${sensitivity.toFixed(1)}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="15" step="0.1" value={sensitivity} name="sensitivity" onChange={changeGameSettings} />
    </div>
  );
};

Inputs.propTypes = {
  exampleConfig: PropTypes.number.isRequired, // 3
  lang: PropTypes.PropTypes.objectOf(PropTypes.string).isRequired,
  countOfGames: PropTypes.number.isRequired,
  sensitivity: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Inputs;
