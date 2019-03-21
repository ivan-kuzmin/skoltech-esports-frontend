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
        {/* <span>
          {`Score: ${result.score}, `}
        </span>
        <span>
          {`Total: ${result.total}`}
        </span> */}
      </span>
    </li>
  );
};

Result.propTypes = {
  result: PropTypes.shape({
    date: PropTypes.string.isRequired,
    // score: PropTypes.number.isRequired,
    // total: PropTypes.number.isRequired,
  }).isRequired,
};

export default Result;
