import React from 'react';
import PropTypes from 'prop-types';

const Result = (props) => {
  const { result } = props;
  return (
    <li className={`${result.success ? 'text-success' : 'text-danger'}`}>
      <span className="text-light">
        <span>{`${result.date} – `}</span>
        <span>{`Time: ${result.time}, `}</span>
        <span>{`String Length: ${result.targetStringLength}`}</span>
      </span>
    </li>
  );
};

Result.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  result: PropTypes.object.isRequired,
};

export default Result;
