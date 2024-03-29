import React from 'react';
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
  padding: 0.9rem;
  max-width: 500px;
  background-color: #ffffff;
  border: 1px solid #aaaaaa;
`;

function Modal({ onClose, isOpen, children, ...otherProps }) {
  if (!isOpen) {
    return null;
  }
  return (
    <ModalStyle {...otherProps} onClick={onClose}>
      <ModalContentStyle className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </ModalContentStyle>
    </ModalStyle>
  );
}

Modal.defaultProps = {
  isOpen: false
};

Modal.propTypes = {
  isClosable: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.any
};

export default Modal;
