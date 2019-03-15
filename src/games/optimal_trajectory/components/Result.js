import React from 'react';
import PropTypes from 'prop-types';

const Result = (props) => {
  const { result } = props;
  return (
    <li className="text-left">
      <span className="text-light">
        <span>
          {`${result.date} – `}
        </span>
        <span>
          {`Balls: ${result.ballsCount}, `}
        </span>
        <span>
          {`Radius: ${result.radius}, `}
        </span>
        <span>
          {`Sensitivity: ${result.sensitivity}`}
        </span>
      </span>
    </li>
  );
};

Result.propTypes = {
  result: PropTypes.shape({
    date: PropTypes.string.isRequired,
    ballsCount: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    sensitivity: PropTypes.number.isRequired,
  }).isRequired,
};

export default Result;
