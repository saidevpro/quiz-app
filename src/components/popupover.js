import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 500;
`;

const ModalContentStyle = styled.div`
  padding: 10px;
`;

function Modal({ onClose, isOpen, children, ...otherProps }) {
  if (!isOpen) {
    return null;
  }
  return (
    <ModalStyle {...otherProps} onClick={onClose}>
      <ModalContentStyle onClick={e => e.stopPropagation()}>{children}</ModalContentStyle>
    </ModalStyle>
  );
}

Modal.defaultProps = {
  isOpen: false
};

Modal.propTypes = {
  isClosable: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default Modal;
