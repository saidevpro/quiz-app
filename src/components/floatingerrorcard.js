import React from 'react';
import styled from 'styled-components';
import ErrorModal from './errormodal';

const FloatingErrorCard = styled(ErrorModal)`
  position: fixed;
  top: 4.5rem;
  right: 1rem;
`;

FloatingErrorCard.displayName = 'FloatingErrorCard';

export default FloatingErrorCard;
