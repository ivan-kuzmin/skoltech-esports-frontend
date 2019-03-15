import React from 'react';
import PropTypes from 'prop-types';

const Result = (props) => {
  const { result } = props;
  return (
    <li className={`${result.success ? 'text-success' : 'text-danger'}`}>
      <span className="text-light">
        <span>{`${result.date} – `}</span>
        <b className="text-success ml-1">{`${result.trueBalls} `}</b>
        <b className="text-danger mr-1">{`${result.falseBalls} `}</b>
        <span>{`Balls: ${result.ballsCount}, `}</span>
        <span>{`Red Balls: ${result.targetBallsCount}, `}</span>
        <span>{`Speed: ${result.speed}, `}</span>
        <span>{`Radius: ${result.radius}`}</span>
      </span>
    </li>
  );
};

Result.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  result: PropTypes.object.isRequired,
};

export default Result;
