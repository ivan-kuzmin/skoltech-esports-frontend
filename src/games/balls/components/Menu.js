import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse } from 'reactstrap';
import styled from 'styled-components';

export const Background = styled.div`
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
`;

const Header = styled.h5`
  position: relative;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  & span {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

const Menu = (props) => {
  const {
    lang, newGameButtonClick, goHome, children,
  } = props;
  const [visibleMenu, setVisibleMenu] = useState(false);

  const handleClick = () => {
    setVisibleMenu(!visibleMenu);
  };

  return (
    <Background id="menu" className="px-3 py-4">
      <div className="text-light mb-5">
        <Header onClick={handleClick} className="font-weight-bold text-center">
          {lang.header}
          <span>{visibleMenu ? '⬇' : '⬅'}</span>
        </Header>
        <Collapse isOpen={visibleMenu} className="small" dangerouslySetInnerHTML={{ __html: lang.description }} />
        {children}
      </div>
      <Button className="btn btn-warning w-100 mb-1 text-uppercase" onClick={newGameButtonClick}>
        {lang.new_game}
      </Button>
      <Button className="btn btn-warning w-100 text-uppercase" onClick={goHome}>
        {lang.home}
      </Button>
    </Background>
  );
};

Menu.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  lang: PropTypes.object.isRequired,
  newGameButtonClick: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired,
};

export default Menu;
