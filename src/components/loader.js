import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CONTAINER_MAX_SIZE = 64;
const CHILDREN_MAX_SIZE = 51;
const CHILDREN_BORDER_MAX_SIZE = 6;

const StyledLoader = styled.div`
  display: inline-block;
  position: relative;
  width: ${props => CONTAINER_MAX_SIZE * props.size + 'px'};
  height: ${props => CONTAINER_MAX_SIZE * props.size + 'px'};
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${props => CHILDREN_MAX_SIZE * props.size + 'px'};
    height: ${props => CHILDREN_MAX_SIZE * props.size + 'px'};
    margin: ${props => CHILDREN_BORDER_MAX_SIZE * props.size + 'px'};
    border: ${props => CHILDREN_BORDER_MAX_SIZE * props.size + 'px'} solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #053344 transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = props => (
  <StyledLoader {...props}>
    <div />
    <div />
    <div />
    <div />
  </StyledLoader>
);

Loader.defaultProps = {
  size: 1
};

Loader.propTypes = {
  size: PropTypes.number
};

export default Loader;
