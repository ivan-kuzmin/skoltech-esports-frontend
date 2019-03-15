import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const Inputs = (props) => {
  const {
    ballsCount,
    speed,
    targetBallsCount,
    radius,
    countOfGames,
    lang,
    changeGameSettings,
  } = props;

  return (
    <div className="small mt-4 pt-2">
      {`${lang.balls}: ${ballsCount}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="5" max="30" step="1" value={ballsCount} name="ballsCount" onChange={changeGameSettings} />
      {`${lang.speed}: ${speed}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="15" step="1" value={speed} name="speed" onChange={changeGameSettings} />
      {`${lang.red_balls}: ${targetBallsCount}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="15" step="1" value={targetBallsCount} name="targetBallsCount" onChange={changeGameSettings} />
      {`${lang.balls_radius}: ${radius}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="40" max="70" step="1" value={radius} name="radius" onChange={changeGameSettings} />
      {`${lang.count_of_trials}: ${countOfGames}`}
      <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} name="countOfGames" onChange={changeGameSettings} />
    </div>
  );
};

Inputs.propTypes = {
  ballsCount: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  targetBallsCount: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  lang: PropTypes.PropTypes.objectOf(PropTypes.string).isRequired,
  countOfGames: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Inputs;
