import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
} from 'reactstrap';
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
`;

const Game = (props) => {
  const {
    status,
    link,
    title,
    description,
  } = props;

  function goToGame() {
    window.location.href = link;
  }

  function statusIcon() {
    switch (status) {
      case 'done':
        return <CheckCircle className="text-success" />;
      case 'danger':
        return <AlertCircle className="text-danger" />;
      default:
        return <div />;
    }
  }

  return (
    <CardContainer onClick={() => goToGame(link)} className="mb-4 border-0">
      <CardBody>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          {statusIcon()}
        </div>
        <CardTitle className="text-capitalize font-weight-bold" dangerouslySetInnerHTML={{ __html: title }} />
        {/* <CardSubtitle dangerouslySetInnerHTML={{__html: subtitle}}></CardSubtitle> */}
        <CardText className="small" style={{ minHeight: '70px' }} dangerouslySetInnerHTML={{ __html: description }} />
      </CardBody>
    </CardContainer>
  );
};

Game.propTypes = {
  status: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Game;
