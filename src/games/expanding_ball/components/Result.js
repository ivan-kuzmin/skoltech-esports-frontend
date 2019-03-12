import React from 'react';
import PropTypes from 'prop-types';

const Result = (props) => {
  const { result } = props;
  return (
    <li className={`${result.success ? 'text-success' : 'text-danger'}`}>
      <span className="text-light">
        <span>
          {`${result.created_at} – `}
        </span>
        <span>
          {`Start Ball: ${result.startRadius}, `}
        </span>
        <span>
          {`Ball: ${result.ballRadius}, `}
        </span>
        <span>
          {`Contour: ${result.contourRadius}, `}
        </span>
        <span>
          {`Speed: ${result.speed} `}
        </span>
      </span>
    </li>
  );
};

Result.propTypes = {
  result: PropTypes.shape({
    success: PropTypes.bool,
    created_at: PropTypes.string,
    startRadius: PropTypes.number,
    ballRadius: PropTypes.number,
    contourRadius: PropTypes.number,
  }).isRequired,
};

export default Result;
