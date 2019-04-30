import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Logo from '../images/logo.png';

const HeaderComponent = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  margin: 0;
  padding: 0.5em 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #ffffff;
`;

const LogoComponent = styled.div`
  width: 100%;
  display: block;
  text-align: center;
  & img {
    height: 4rem;
    display: inline-block;
  }
`;

const Header = ({ style }) => (
  <HeaderComponent style={style}>
    <LogoComponent>
      <img src={Logo} alt="application logo" />
    </LogoComponent>
  </HeaderComponent>
);

Header.propTypes = {
  style: PropTypes.object
};

export default Header;
