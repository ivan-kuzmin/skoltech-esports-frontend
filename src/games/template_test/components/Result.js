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
        {/* 1 */}
        <span>
          {`Example Config: ${result.exampleConfig}`}
        </span>
      </span>
    </li>
  );
};

Result.propTypes = {
  result: PropTypes.shape({
    date: PropTypes.string.isRequired,
    // 2
    exampleConfig: PropTypes.number.isRequired,
  }).isRequired,
};

export default Result;
