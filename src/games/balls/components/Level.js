import React from 'react';
import PropTypes from 'prop-types';

const Level = (props) => {
  const { lang, current_level, radius } = props;

  return (
    <div className="text-light mb-5">
      <h5 className="font-weight-bold text-center">{`${lang.current_level} – ${current_level.level}:`}</h5>
      <div>{`${lang.balls}: ${current_level.balls}`}</div>
      <div>{`${lang.speed}: ${current_level.speed}`}</div>
      <div>{`${lang.red_balls}: ${current_level.red_balls}`}</div>
      <div>{`${lang.balls_radius}: ${radius}`}</div>
    </div>
  );
};

Level.propTypes = {
  current_level: PropTypes.objectOf(PropTypes.number).isRequired,
  radius: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lang: PropTypes.object.isRequired,
};

export default Level;
