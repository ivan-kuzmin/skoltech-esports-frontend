import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Col, Nav, NavItem } from "reactstrap";
import styled from 'styled-components'
import { ArrowRight, ArrowLeft, Home, Users, HelpCircle } from 'react-feather';

const NavbarCol = styled(Col)`
  transition: 0.2s;
  flex: 0 0 ${props => props.width} !important;
  max-width: ${props => props.width} !important;
  min-width: 50px;
`

const MenuButton = styled.div`
  cursor: pointer;
  background: none !important;
  border: none !important;
  color: white;
  height: 60px;
  width: 100%;
  text-align: inherit !important;
`

const menuList = [
  {
    link: '/home',
    name: 'Home',
    icon: <Home />,
  },
  {
    link: '/users',
    name: 'Users',
    icon: <Users />,
  },
  {
    link: '/help',
    name: 'Help',
    icon: <HelpCircle />,
  },
]

class NavbarMenu extends Component {
  toggleMenu = () => {
    if (this.props.visibleMenu) {
      this.props.toggleMenu()
    }
  }
  render() {
    const { visibleMenu, toggleMenu, hiddenMenuWidth, unhiddenMenuWidth } = this.props
    return (
      <NavbarCol width={visibleMenu ? unhiddenMenuWidth : hiddenMenuWidth} style={{zIndex: '2'}} className={`pb-3 h-100 bg-dark px-0 position-absolute ${visibleMenu ? 'text-right shadow' : 'text-center'}`}>
        <Nav vertical className="sticky-top">
          <MenuButton
            className={`d-flex align-items-center ${visibleMenu ? 'justify-content-end px-3' : 'justify-content-center'}`}
            onClick={toggleMenu}>
            {visibleMenu ? <ArrowLeft /> : <ArrowRight />}
          </MenuButton>
          {
            menuList.map((item, i) => (
              <NavItem key={i}>
                <NavLink
                  to={item.link}
                  activeClassName="text-dark"
                  activeStyle={{background: 'rgba(247, 249, 250, 0.7)'}}
                  className="nav-link text-light font-weight-light d-flex align-items-center justify-content-end"
                  style={{height: '55px'}}
                  onClick={this.toggleMenu}>
                  <div className={`ml-0 mr-auto ${visibleMenu ? 'd-flex' : 'd-none'}`}>{item.name}</div>
                  {item.icon}
                </NavLink>
              </NavItem>
            ))
          }
        </Nav>
      </NavbarCol>
    )
  };
}

export default NavbarMenu;
