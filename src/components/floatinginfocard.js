import React from 'react';
import styled from 'styled-components';
import ErrorModal from './errormodal';

const FloatingInfoModal = styled(ErrorModal)`
  position: fixed;
  bottom: 4.5rem;
  right: 1rem;
  background-color: #cce5ff;
  color: #1a4c90;
`;

FloatingInfoModal.displayName = 'FloatingInfoModal';

export default FloatingErrorCard;
