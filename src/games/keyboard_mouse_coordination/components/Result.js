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
        <span>
          {'Time: '}
          <b>{result.time}</b>
          {', '}
        </span>
        <span>
          {`Balls: ${result.ballsCount}, `}
        </span>
        <span>
          {`Speed: ${result.speed}, `}
        </span>
        <span>
          {'Hit: '}
          <i>{`«${result.mode}»`}</i>
          {', '}
        </span>
      </span>
    </li>
  );
};

Result.propTypes = {
  result: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    ballsCount: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
  }).isRequired,
};

export default Result;
