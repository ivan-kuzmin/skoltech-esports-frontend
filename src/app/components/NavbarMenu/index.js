import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Col, Nav, NavItem } from 'reactstrap';
import styled from 'styled-components';
import {
  ArrowRight,
  ArrowLeft,
  Home,
  Users,
  HelpCircle,
} from 'react-feather';

const NavbarCol = styled(Col)`
  transition: 0.2s;
  width: 300px !important;
  transform: translateX(${props => (props.visible ? '0' : '-240px')});
  transition: 0.3s;
  min-width: 50px;
`;

const MenuButton = styled.div`
  cursor: pointer;
  background: none !important;
  border: none !important;
  color: white;
  height: 60px;
  width: 100%;
  text-align: inherit !important;
`;

const menuList = [
  {
    id: 0,
    link: '/home',
    name: 'Home',
    icon: <Home />,
  },
  {
    id: 1,
    link: '/users',
    name: 'Users',
    icon: <Users />,
  },
  {
    id: 2,
    link: '/help',
    name: 'Help',
    icon: <HelpCircle />,
  },
];

const NavbarMenu = (props) => {
  const {
    visibleMenu,
    toggleMenu,
  } = props;

  function closeMenu() {
    if (visibleMenu) { toggleMenu(); }
  }

  return (
    <NavbarCol visible={visibleMenu ? 1 : 0} style={{ zIndex: '2' }} className={`pb-3 h-100 bg-dark px-0 position-absolute ${visibleMenu ? 'text-right shadow' : 'text-center'}`}>
      <Nav vertical className="sticky-top">
        <MenuButton
          className="d-flex align-items-center justify-content-end px-3"
          onClick={toggleMenu}
        >
          {visibleMenu ? <ArrowLeft /> : <ArrowRight />}
        </MenuButton>
        {
          menuList.map(item => (
            <NavItem key={item.id}>
              <NavLink
                to={item.link}
                activeClassName="text-dark"
                activeStyle={{ background: 'rgba(247, 249, 250, 0.7)' }}
                className="nav-link text-light font-weight-light d-flex align-items-center justify-content-end"
                style={{ height: '55px' }}
                onClick={closeMenu}
              >
                <div className={`ml-0 mr-auto ${visibleMenu ? 'd-flex' : 'd-none'}`}>{item.name}</div>
                {item.icon}
              </NavLink>
            </NavItem>
          ))
        }
      </Nav>
    </NavbarCol>
  );
};

NavbarMenu.propTypes = {
  visibleMenu: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default NavbarMenu;
