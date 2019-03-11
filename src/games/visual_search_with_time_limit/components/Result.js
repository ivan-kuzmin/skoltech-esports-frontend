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
          {`Matrix Size: ${result.matrixSize}, `}
        </span>
        <span>
          {`Letter Size: ${result.letterSize} `}
        </span>
      </span>
    </li>
  );
};

Result.propTypes = {
  result: PropTypes.shape({
    success: PropTypes.bool,
    created_at: PropTypes.string,
    matrixSize: PropTypes.number,
    letterSize: PropTypes.number,
  }).isRequired,
};

export default Result;
