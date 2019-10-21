import React from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import Logo from '../../images/logo.png';
import { NavLink } from 'react-router-dom';

const HeaderComponent = Styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  margin: 0;
  display: flex;
  justify-content: space-between;
  height: 2.6rem;
  padding: 0 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #ffffff;
`;

const LogoComponent = Styled(NavLink)`
  display: flex;
  align-items: center;
  & img {
    height: 2rem;
    display: inline-block;
  }
`;

const Header = ({ className, children }) => (
  <HeaderComponent className={className}>
    <LogoComponent to="/">
      <img src={Logo} alt="application logo" />
    </LogoComponent>
    {children}
  </HeaderComponent>
);

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
