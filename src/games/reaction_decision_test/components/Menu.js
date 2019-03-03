import React from 'react'
import { Background } from 'src/games/balls/components/Menu'
import PropTypes from 'prop-types';
import { Button } from 'reactstrap'

const Menu = (props) => {
  const { lang, token, newGameButtonClick } = props
  const current_level = props.current_level
  return (
    <Background className="px-3 py-5">
      <div className="text-light mb-5">
        <h5 className="font-weight-bold text-center">{lang.header}</h5>
        {/* <p dangerouslySetInnerHTML={{__html: lang.description}} /> */}
        <p>---</p>
      </div>
      <div className="text-light mb-5">
        <h5 className="font-weight-bold text-center">{`${lang.current_level} – ${current_level.level}:`}</h5>
      </div>
      <Button hidden={!token} className="btn btn-warning w-100 mb-1 text-uppercase" onClick={newGameButtonClick}>{lang.new_game}</Button>
      <a href="/" role="button" className="btn btn-warning w-100 text-uppercase">{lang.home}</a>
    </Background>
  )
}

Menu.propTypes = {
  token: PropTypes.string,
  current_level: PropTypes.objectOf(PropTypes.number).isRequired,
  radius: PropTypes.number.isRequired,
  lang: PropTypes.object.isRequired,
  newGameButtonClick: PropTypes.func.isRequired,
};

export default Menu;
