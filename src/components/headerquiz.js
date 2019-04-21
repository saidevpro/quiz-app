import React from 'react';
import styled from 'styled-components';
import Logo from '../images/logo.png';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  margin: 0;
  padding: 1.5rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #ffffff;
`;

const LogoComponent = styled.div`
  width: 100%;
  display: block;
  text-align: center;
  & img {
    width: 6em;
    display: inline-block;
  }
`;

export default props => (
  <Header>
    <LogoComponent>
      <img src={Logo} alt="application logo" />
    </LogoComponent>
  </Header>
);
