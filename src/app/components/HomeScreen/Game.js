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
  overflow: hidden;
  &:hover {
    -webkit-box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
    -moz-box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
  }
  &:before {
    content: "";
    height: 100%;
    width: 6px;
    position: absolute;
    top: 0;
    left: 0;
    background: #28a745;
    visibility: hidden;
    transform: translateX(-6px);
    transition: all 0.1s ease-in-out;
  }
  &:hover:before {
    visibility: visible;
    transform: translateX(0);
  }
`;

const Description = styled(CardText)`
  height: 60px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
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
        <Description className="small" dangerouslySetInnerHTML={{ __html: description }} />
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
