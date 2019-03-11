import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { lang } from '../lang';

const Inputs = (props) => {
  const {
    newGame,
    countOfGames,
    matrixSize,
    letterSize,
    changeGameSettings,
    current_lang,
  } = props;
  const { Inputs: inputs } = lang[current_lang];

  return (
    <div className="small mt-4 pt-2">
      {/* eslint-disable */}
      {`${inputs.matrixSize}: ${matrixSize}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="5" max="30" step="1" value={matrixSize} onChange={e => changeGameSettings(e, 'matrixSize')} />
      {`${inputs.letterSize}: ${letterSize}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="5" max="30" step="1" value={letterSize} onChange={e => changeGameSettings(e, 'letterSize')} />
      {`${inputs.count_of_trials}: ${countOfGames}`}
      <Input disabled={newGame} className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} onChange={e => changeGameSettings(e, 'countOfGames')} />
      {/* eslint-enable */}
    </div>
  );
};

Inputs.propTypes = {
  matrixSize: PropTypes.number.isRequired,
  letterSize: PropTypes.number.isRequired,
  current_lang: PropTypes.string.isRequired,
  newGame: PropTypes.bool.isRequired,
  countOfGames: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Inputs;
