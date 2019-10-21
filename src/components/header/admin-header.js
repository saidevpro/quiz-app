import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import HeaderLayout from './layout';

const Nav = styled.nav`
  display: flex;
  .nav-list {
    display: flex;
    list-style: none;
    .nav-item {
      display: flex;
      .nav-link {
        display: flex;
        align-items: center;
        padding: 0 0.9rem;
        text-decoration: none;
        color: #053344;
        &.active {
          border-bottom: 2px solid #053344;
        }
      }
    }
  }
`;

const Header = ({ className }) => (
  <HeaderLayout className={className}>
    <Nav>
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/admin/create/quiz" className="nav-link" activeClassName="active">
            Create quiz
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/quizzes" className="nav-link" activeClassName="active">
            See the quizzes
          </NavLink>
        </li>
      </ul>
    </Nav>
  </HeaderLayout>
);

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
