import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  @media (min-width: 576px) {
    width: ${props => (props.sm / 12) * 100}%;
  }
  @media (min-width: 768px) {
    width: ${props => (props.md / 12) * 100}%;
  }
  @media (min-width: 992px) {
    width: ${props => (props.lg / 12) * 100}%;
  }
  @media (min-width: 1200px) {
    width: ${props => (props.xl / 12) * 100}%;
  }
`;

Container.defaultProps = {
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12
};

Container.propTypes = {
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number
};

Container.displayName = 'Container';

export default Container;
