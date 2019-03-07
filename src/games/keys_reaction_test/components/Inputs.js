import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { lang } from '../lang';

const Inputs = (props) => {
  const {
    newGame,
    countOfGames,
    changeGameSettings,
    current_lang,
    targetStringLength,
  } = props;
  const { Inputs: inputs } = lang[current_lang];

  return (
    <div className="small mt-4 pt-2">
      {/* eslint-disable */}
      {`${inputs.targetStringLength}: ${targetStringLength}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="3" max="15" step="1" value={targetStringLength} onChange={e => changeGameSettings(e, 'targetStringLength')} />
      {`${inputs.count_of_trials}: ${countOfGames}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} onChange={e => changeGameSettings(e, 'countOfGames')} />
      {/* eslint-enable */}
    </div>
  );
};

Inputs.propTypes = {
  targetStringLength: PropTypes.number.isRequired,
  current_lang: PropTypes.string.isRequired,
  newGame: PropTypes.bool.isRequired,
  countOfGames: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Inputs;
