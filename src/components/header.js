import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';

const HeaderComponent = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  margin: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #ffffff;
`;

const LogoComponent = styled.div`
  display: block;
  padding-left: 20px;
  padding: 0.5em 0;
  & img {
    height: 2rem;
    display: inline-block;
  }
`;

const Nav = styled.nav`
  display: block;
  .nav-list {
    list-style: none;
    height: 100%;
    .nav-item {
      display: inline-block;
      height: 100%;
      .nav-link {
        display: inline-block;
        padding: 0.9rem 1rem 0.5rem;
        height: 100%;
        text-decoration: none;
        color: #053344;
        &.active {
          background-color: #053344;
          color: #ffffff;
          border-right: 1px solid #e0e0e0;
          border-left: 1px solid #e0e0e0;
        }
      }
    }
  }
`;

const Header = ({ className }) => (
  <HeaderComponent className={className}>
    <LogoComponent>
      <img src={Logo} alt="application logo" />
    </LogoComponent>
    <Nav>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/create/quiz" className="nav-link" activeClassName="active">
            Create quiz
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/quizzes" className="nav-link" activeClassName="active">
            See the quizzes
          </NavLink>
        </li>
      </ul>
    </Nav>
  </HeaderComponent>
);

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
