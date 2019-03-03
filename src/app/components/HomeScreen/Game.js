import React, { Component } from "react";
// import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, CardBody } from 'reactstrap';
import { CheckCircle, AlertCircle } from 'react-feather';
import styled from 'styled-components';

const CardContainer = styled(Card)`
  transition: 0.3s;
  cursor: pointer;
  flex-basis: 20% !important;
  -webkit-box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  -moz-box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  &:hover {
    svg {
      display: block;
    }
    transform: scale(1.03);
    -webkit-box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
    -moz-box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
  }
`

class Game extends Component {
  goToGame(link) {
    window.location.href = link
  }
  statusIcon = () => {
    switch (this.props.status) {
      case "done":
        return <CheckCircle className="text-success" />
      case "danger":
        return <AlertCircle className="text-danger" />
      default:
        return <div />
    }
  }
  render = () => {
    const { link, title, description } = this.props
    return (
      <CardContainer onClick={() => this.goToGame(link)} className="mb-4 border-0">
        {/* <CardImg top width="100%" style={{minHeight: '170px'}} src={image} alt="Card image cap" /> */}
        <CardBody>
          <div style={{position: 'absolute', top: '10px', right: '10px'}}>
            {this.statusIcon()}
          </div>
          <CardTitle className="text-capitalize font-weight-bold" dangerouslySetInnerHTML={{__html: title}}></CardTitle>
          {/* <CardSubtitle dangerouslySetInnerHTML={{__html: subtitle}}></CardSubtitle> */}
          <CardText className="small" style={{minHeight: '70px'}} dangerouslySetInnerHTML={{__html: description}}></CardText>
        </CardBody>
      </CardContainer>
  )}
}

export default Game;
