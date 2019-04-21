import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  @media (min-width: 576px) {
    width: ${props => ((props.xs || 12) / 12) * 100}%;
  }
  @media (min-width: 768px) {
    width: ${props => ((props.md || 12) / 12) * 100}%;
  }
  @media (min-width: 992px) {
    width: ${props => ((props.lg || 12) / 12) * 100}%;
  }
  @media (min-width: 1200px) {
    width: ${props => ((props.xl || 12) / 12) * 100}%;
  }
`;

Container.propTypes = {
  lg: PropTypes.number,
  md: PropTypes.number,
  xs: PropTypes.number,
  xl: PropTypes.number
};

export default Container;
