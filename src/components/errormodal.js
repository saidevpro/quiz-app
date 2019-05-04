import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Error = styled.div`
  position: relative;
  display: block;
  padding: 1rem;
  padding-right: 45px;
  border-radius: 5px;
  font-size: 0.9rem;
  background-color: #f4a4a4;
`;

const Closer = styled.div`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 27px;
  height: 27px;
  line-height: 27px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const ErrorModal = ({ children, isOpen, className, handleClose }) =>
  !isOpen ? null : (
    <Error className={className}>
      <Closer onClick={handleClose}>&#10005;</Closer>
      {children}
    </Error>
  );

ErrorModal.propTypes = {
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  handleClose: PropTypes.func
};

ErrorModal.displayName = 'ErrorModal';

export default ErrorModal;
