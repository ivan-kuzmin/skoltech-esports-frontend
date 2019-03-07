import React from 'react';
import PropTypes from 'prop-types';

const Result = (props) => {
  const { result } = props;
  return (
    <li className="text-left">
      <span className="text-light">
        <span>
          {`${result.created_at} – `}
        </span>
        <span>
          {`Speed: ${result.speed}, `}
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
    created_at: PropTypes.string,
    speed: PropTypes.number,
    radius: PropTypes.number,
    sensitivity: PropTypes.number,
  }).isRequired,
};

export default Result;
