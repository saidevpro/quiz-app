import React from 'react';
import Styled from 'styled-components';

const Column = Styled.div`
    display: block;
    padding-left: 1rem;
    padding-right: 1rem;
    ${({ flex }) =>
      flex &&
      `
        flex: 0 0 ${(flex / 12) * 100}%
    `}
    ${({ sm }) =>
      sm &&
      `
        @media (min-width: 576px) {
            flex: 0 0 ${(sm / 12) * 100}%;
        }
    `}
    ${({ md }) =>
      md &&
      `
        @media (min-width: 768px) {
            flex: 0 0 ${(md / 12) * 100}%;
        }
    `}
    ${({ lg }) =>
      lg &&
      `
        @media (min-width: 992px) {
            flex: 0 0 ${(lg / 12) * 100}%;
        }
    `}
    ${({ xl }) =>
      xl &&
      `
        @media (min-width: 1200px) {
            flex: 0 0 ${(xl / 12) * 100}%;
        }
    `}
`;

export default Column;
