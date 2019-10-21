import React from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const Space = styled.hr`
  border: none;
  margin: 0;
  padding: 0;
  margin-top: ${props => `${props.size}rem`};
  ${({ sm }) =>
    sm &&
    `
        @media (min-width: 576px) {
            margin-top: ${sm}rem;
        }
    `}
    ${({ md }) =>
      md &&
      `
        @media (min-width: 768px) {
            margin-top: ${md}rem;
        }
    `}
    ${({ lg }) =>
      lg &&
      `
        @media (min-width: 992px) {
            margin-top: ${lg}rem;
        }
    `}
    ${({ xl }) =>
      xl &&
      `
        @media (min-width: 1200px) {
            margin-top: ${xl}rem;
        }
    `}
`;

Space.displayName = 'Space';

export default Space;
