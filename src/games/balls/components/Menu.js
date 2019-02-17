import React, { Component } from 'react'
// import { withCookies } from 'react-cookie';
import { Button } from 'reactstrap'
import styled from 'styled-components'
import globalState from '../globalState'

const Background = styled.div`
  background: rgb(8, 0, 47);
  height: 100%;
  flex: 0 0 20%;
  max-width: 20%;
  overflow: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
  }
`

class Menu extends Component {
  render() {
    const { lang, status, token } = this.props
    const current_level = this.props.current_level || globalState.current_level
    return (
      <Background id="menu" className="px-3 py-5">
        <div className="text-light mb-5">
          <h5 className="font-weight-bold text-center">{lang.header}</h5>
          <p>{lang.description}</p>
        </div>
        <div className="text-light mb-5">
          <h5 className="font-weight-bold text-center">{`${lang.current_level} – ${current_level.level}:`}</h5>
          <div>{`${lang.balls}: ${current_level.balls}`}</div>
          <div>{`${lang.speed}: ${current_level.speed}`}</div>
          <div>{`${lang.red_balls}: ${current_level.red_balls}`}</div>
          <div>{`${lang.balls_radius}: ${globalState.rad}`}</div>
        </div>
        <Button hidden={!token} className="btn btn-warning w-100 mb-1 text-uppercase" id="newGameButton">{lang.new_game}</Button>
        <a href="/" role="button" className="btn btn-warning w-100 text-uppercase" id="backButton">{lang.home}</a>
      </Background>
    )
  }
}

export default Menu;
