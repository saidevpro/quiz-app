import React from 'react';
import styled from 'styled-components';

const CardCode = styled.pre`
  background-color: ${props => (props.theme === 'primary' ? '#053344' : 'rgba(0,0,0,0.1)')};
  color: ${props => (props.theme === 'primary' ? '#ffffff' : '#000')};
  padding: 0.7rem 1.5rem;
  letter-spacing: 2px;
  font-family: 'Roboto Slab';
  white-space: pre-wrap;
`;

CardCode.displayName = 'CardCode';

export default CardCode;
