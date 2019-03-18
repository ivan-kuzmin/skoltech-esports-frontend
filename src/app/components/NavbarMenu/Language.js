import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'reactstrap';
import rusIcon from './russia.png';
import ukIcon from './uk.png';

const NavbarMenu = (props) => {
  const {
    visibleMenu, closeMenu, current_lang, changeLanguage,
  } = props;

  return (
    <NavItem className="mt-auto" style={{ position: 'sticky', bottom: '20px' }}>
      <NavLink
        className="nav-link text-light font-weight-light d-flex align-items-center justify-content-end"
        style={{ height: '55px', cursor: 'pointer' }}
        onClick={(e) => { closeMenu(); changeLanguage(); e.preventDefault(); }}
      >
        <div className={`ml-0 mr-auto ${visibleMenu ? 'd-flex' : 'd-none'}`}>Language</div>
        {(current_lang === 'en') && <img style={{ width: '24px' }} alt="en" src={ukIcon} />}
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
