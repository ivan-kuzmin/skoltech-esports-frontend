import React, { Component } from "react"
import P5Wrapper from 'react-p5-wrapper'
import { Link } from 'react-scroll'
import sketch from './sketch'
// import { NavLink } from "react-router-dom"
// import { Button } from "reactstrap"
import styled from "styled-components"

const Menu = styled.div`
  height: 100vh;
  width: 20%;
  background: rgb(8, 0, 47);
`

const Button = styled.div`
  background: rgb(255,220,0);
  cursor: pointer;
`

class Balls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      started: false,
    }
  }
  handleClick = () => {
    const { started } = this.state
    this.setState({started: !started, numBalls: 50})
  }
  saveResults = (results) => {
    this.setState({results})
  }
  render() {
    const { started, numBalls, results } = this.state
    return (
      <div>
        {/* <h3 className="text-center text-light">Hello Balls</h3> */}
        <div style={{margin: '-1.5rem -15px 0'}}>
          <Menu className="px-3 py-4">
            <Link to="Balls_div" smooth={true} duration={200}>
              <Button id="Balls_newGameButton" className="font-weight-light px-3 py-2 text-center" onClick={this.handleClick}>Start - numBalls: {numBalls}</Button>
            </Link>
            {
              results && <div className="text-light text-center">
                <h5>Your results:</h5>
                {
                  results.map((data, i) =>
                    <ul key={i}>
                      <li>{`trueBalls = ` + data.trueBalls}</li>
                      <li>{`falseBalls = ` + data.falseBalls}</li>
                    </ul>
                  )
                }
              </div>
            }
          </Menu>
          <div id="Balls_div" style={{position: 'absolute', top: 0, left: '20%', height: '100vh', width: '80%', overflow: 'hidden'}}>
            <P5Wrapper sketch={sketch} started={started} numBalls={numBalls} saveResults={this.saveResults} />
          </div>
        </div>
      </div>
    )
  };
}

export default Balls;
