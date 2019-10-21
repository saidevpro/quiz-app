import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import HeaderLayout from './layout';

const Header = ({ className }) => <HeaderLayout className={className} />;

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
