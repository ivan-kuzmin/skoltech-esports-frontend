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
    date: PropTypes.string,
    radius: PropTypes.number,
    sensitivity: PropTypes.number,
  }).isRequired,
};

export default Result;
