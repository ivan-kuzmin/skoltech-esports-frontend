import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import rusIcon from './russia.png';
import usaIcon from './usa.png';

const NavbarMenu = (props) => {
  const {
    visibleMenu, closeMenu, current_lang, changeLanguage,
  } = props;

  return (
    <NavItem>
      <NavLink
        to=""
        activeClassName=""
        activeStyle={{}}
        className="nav-link text-light font-weight-light d-flex align-items-center justify-content-end"
        style={{ height: '55px' }}
        onClick={(e) => { closeMenu(); changeLanguage(); e.preventDefault(); }}
      >
        <div className={`ml-0 mr-auto ${visibleMenu ? 'd-flex' : 'd-none'}`}>Language</div>
        {(current_lang === 'en') && <img style={{ width: '24px' }} alt="en" src={usaIcon} />}
        {(current_lang === 'ru') && <img style={{ width: '24px' }} alt="ru" src={rusIcon} />}
      </NavLink>
    </NavItem>
  );
};

NavbarMenu.propTypes = {
  visibleMenu: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  current_lang: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired,
};

export default NavbarMenu;
