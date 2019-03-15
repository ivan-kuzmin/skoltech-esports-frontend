import React from 'react';
import PropTypes from 'prop-types';

const Result = (props) => {
  const { result } = props;
  return (
    <li className={`${result.success ? 'text-success' : 'text-danger'}`}>
      <span className="text-light">
        <span>
          {`${result.date} – `}
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
    success: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    matrixSize: PropTypes.number.isRequired,
    letterSize: PropTypes.number.isRequired,
  }).isRequired,
};

export default Result;
