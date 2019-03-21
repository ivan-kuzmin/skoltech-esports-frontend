import React from 'react';
import PropTypes from 'prop-types';

const Result = (props) => {
  const { result } = props;
  return (
    <li className={`text-left ${result.success ? 'text-success' : 'text-danger'}`}>
      <span className="text-light">
        <span>
          {result.date}
          {' – '}
        </span>
        <span>
          {'Time Reaction: '}
          <b>
            {result.time_reaction}
          </b>
          {', '}
        </span>
        <span>
          {`Radius: ${result.radius}`}
        </span>
      </span>
    </li>
  );
};

Result.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  result: PropTypes.object.isRequired,
};

export default Result;
