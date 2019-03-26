import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const Inputs = (props) => {
  const {
    countOfGames,
    matrixSize,
    cellSize,
    changeGameSettings,
    countOfTargets,
    lang,
  } = props;

  return (
    <div className="small mt-4 pt-2">
      {`${lang.matrixSize}: ${matrixSize}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="5" max="10" step="1" value={matrixSize} name="matrixSize" onChange={changeGameSettings} />
      {`${lang.cellSize}: ${cellSize}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="60" max="80" step="1" value={cellSize} name="cellSize" onChange={changeGameSettings} />
      {`${lang.countOfTargets}: ${countOfTargets}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="10" step="1" value={countOfTargets} name="countOfTargets" onChange={changeGameSettings} />
      {`${lang.count_of_trials}: ${countOfGames}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} name="countOfGames" onChange={changeGameSettings} />
    </div>
  );
};

Inputs.propTypes = {
  matrixSize: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  countOfTargets: PropTypes.number.isRequired,
  lang: PropTypes.PropTypes.objectOf(PropTypes.string).isRequired,
  countOfGames: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Inputs;
