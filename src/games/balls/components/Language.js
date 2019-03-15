import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.div`
  padding: 5px 10px;
  position: absolute;
  ${'' /* font-weight: bold; */}
  cursor: pointer;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 5px -5px 0px 0px rgba(0,0,0,0.7);
  -moz-box-shadow: 5px -5px 0px 0px rgba(0,0,0,0.7);
  box-shadow: 5px -5px 0px 0px rgba(0,0,0,0.7);
  transition: 0.2s;
  :hover {
    opacity: 0.9;
  }
  :active {
    opacity: 0.8;
    transform: scale(0.9);
  }
`;

const Language = (props) => {
  const { changeLanguage, current_lang } = props;

  return (
    <Button id="language" className="bg-warning" onClick={changeLanguage}>
      <span className={current_lang === 'ru' ? 'font-weight-bold' : ''}>RU</span>
      /
      <span className={current_lang === 'en' ? 'font-weight-bold' : ''}>EN</span>
    </Button>
  );
};

Language.propTypes = {
  current_lang: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
};


export default Language;
