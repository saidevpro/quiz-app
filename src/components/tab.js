import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTab = styled.div`
  padding: 0.6em 0;
  margin-bottom: -1px;
  color: #6d6d6d;
  flex-grow: 1;
  text-align: center;
  cursor: pointer;
  &.active {
    border-bottom: 2px solid;
    color: #393dcd;
  }
`;

const Tab = ({ children, onClick, isActive, index, dataLabel }) => (
  <StyledTab onClick={onClick} className={isActive ? 'active' : null} data-id={index} data-label={dataLabel}>
    {children}
  </StyledTab>
);

Tab.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  index: PropTypes.number,
  dataLabel: PropTypes.string
};

export default Tab;
