import React from 'react';
import styled from 'styled-components';

const colors = {
  black: '#313131',
  grey: 'rgba(0,0,0,0.48)',
  blue: '#4f29f9',
  red: '#d6101d',
  dart: '#3dafe7',
  javascript: '#539e43',
  html: '#f1673d',
  php: '#626988',
  css: '#379ad6',
  sql: '#2485ce'
};

const Text = styled.p`
  ${({ size }) =>
    size &&
    `
    font-size: ${size};
  `}
  ${({ color }) =>
    color &&
    `
    color: ${colors[color] ? colors[color] : 'initial'} ;
  `}

  ${({ weight }) =>
    weight &&
    `
    font-weight: ${weight} ;
  `}
`;

export default Text;
