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
          {'Time: '}
          <b>{result.time.toFixed(3)}</b>
          {', '}
        </span>
        <span>
          {`Balls: ${result.balls}, `}
        </span>
        <span>
          {`Speed: ${result.speed}, `}
        </span>
        <span>
          {'Hit: '}
          <i>{`«${result.hit}»`}</i>
          {', '}
        </span>
      </span>
    </li>
  );
};

Result.propTypes = {
  result: PropTypes.shape({
    created_at: PropTypes.string,
    time: PropTypes.number,
    balls: PropTypes.number,
    speed: PropTypes.number,
    hit: PropTypes.string,
  }).isRequired,
};

export default Result;
