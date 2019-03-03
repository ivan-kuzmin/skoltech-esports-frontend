import React from 'react';
import PropTypes from 'prop-types';

const Result = (props) => {
  const { result } = props;
  return (
    <li className={`text-left ${result.success ? 'text-success' : 'text-danger'}`}>
      <span className="text-light">
        <span>
          {result.created_at}
          {' – '}
        </span>
        <span>
          {'Time Reaction: '}
          <b>
            {result.time_reaction.toFixed(3)}
          </b>
          {', '}
        </span>
        <span>
          {'Mode: '}
          <i>
            {'«'}
            {result.mode}
            {'»'}
          </i>
        </span>
      </span>
    </li>
  );
};

Result.propTypes = {
  result: PropTypes.shape({
    created_at: PropTypes.string,
    time_reaction: PropTypes.number,
    mode: PropTypes.string,
    success: PropTypes.bool,
  }).isRequired,
};

export default Result;
