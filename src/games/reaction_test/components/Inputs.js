import React from 'react';
import PropTypes from 'prop-types';
import { Input, ButtonGroup, Button } from 'reactstrap';

const Inputs = (props) => {
  const {
    countOfGames,
    changeGameSettings,
    leftMouseMode,
    lang,
  } = props;

  return (
    <>
      <div className="btn-group btn-group-sm btn-group-toggle w-100 mb-2" data-toggle="buttons">
        <ButtonGroup className="w-100 small" size="sm">
          <Button name="leftMouseMode" value={1} onClick={changeGameSettings} className={`btn-warning w-50 ${leftMouseMode ? 'active' : ''}`}>Left Mouse</Button>
          <Button name="leftMouseMode" value={0} onClick={changeGameSettings} className={`btn-warning w-50 ${leftMouseMode ? '' : 'active'}`}>Space</Button>
        </ButtonGroup>
      </div>
      <div className="small mt-3">
        {`${lang.count_of_trials}: ${countOfGames}`}
        <Input className="custom-range border-0 mb-2" style={{ background: 'none' }} type="range" bsSize="sm" min="1" max="25" step="1" value={countOfGames} name="countOfGames" onChange={changeGameSettings} />
      </div>
    </>
  );
};

Inputs.propTypes = {
  lang: PropTypes.PropTypes.objectOf(PropTypes.string).isRequired,
  leftMouseMode: PropTypes.number.isRequired,
  countOfGames: PropTypes.number.isRequired,
  changeGameSettings: PropTypes.func.isRequired,
};

export default Inputs;
