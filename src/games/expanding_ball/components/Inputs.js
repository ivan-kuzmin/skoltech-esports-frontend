import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const Inputs = (props) => {
  const {
    countOfGames,
    changeGameSettings,
    lang,
  } = props;

  return (
    <div className="small mt-4">
      {`${lang.count_of_trials}: ${countOfGames}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} name="countOfGames" onChange={changeGameSettings} />
    </div>
  );
};

Inputs.propTypes = {
  lang: PropTypes.PropTypes.objectOf(PropTypes.string).isRequired,
  countOfGames: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Inputs;
