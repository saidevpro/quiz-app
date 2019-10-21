import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const scalable = keyframes`
  0% {
    transform: scale(0.5)
  } 50 {
    transform: scale(1.2)
  } 100% {
    transform: scale(1)
  }
`;

const Error = styled.div`
  position: relative;
  display: block;
  padding: 1rem;
  padding-right: 45px;
  border-radius: 5px;
  font-size: 0.9rem;
  background-color: #f4a4a4;
  animation: ${scalable} 0.1s ease-in;
  transform-origin: top right;
`;

const Closer = styled.div`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 27px;
  height: 27px;
  transform: scale(0.8);
  transition: 0.3s all;
  line-height: 27px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
    transform: scale(1);
  }
`;

const ErrorModal = ({ children, isOpen, className, onClose }) =>
  !isOpen ? null : (
    <Error className={className}>
      <Closer onClick={onClose}>&#10005;</Closer>
      {children}
    </Error>
  );

ErrorModal.propTypes = {
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  onClose: PropTypes.func
};

ErrorModal.displayName = 'ErrorModal';

export default ErrorModal;
