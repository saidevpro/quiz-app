import React from 'react';
import Styled from 'styled-components';

const Row = Styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
  ${({ direction }) =>
    direction &&
    `
    flex-direction: ${direction}
  `}
  ${({ align }) =>
    align &&
    `
    align-items: ${align}
  `}
  ${({ justify }) =>
    justify &&
    `
    justify-content: ${justify}
  `}
  ${({ smJustify }) =>
    smJustify &&
    `
    @media (min-width: 576px) {
        justify-content: ${smJustify};
    }
  `}
  ${({ mdJustify }) =>
    mdJustify &&
    `
      @media (min-width: 768px) {
        justify-content: ${mdJustify};
      }
  `}
  ${({ lgJustify }) =>
    lgJustify &&
    `
      @media (min-width: 992px) {
        justify-content: ${lgJustify};
      }
  `}
  ${({ xlJustify }) =>
    xlJustify &&
    `
      @media (min-width: 1200px) {
        justify-content: ${xlJustify};
      }
  `}
  ${({ smAlign }) =>
    smAlign &&
    `
    @media (min-width: 576px) {
        align-items: ${smAlign};
    }
  `}
  ${({ mdAlign }) =>
    mdAlign &&
    `
      @media (min-width: 768px) {
        align-items: ${mdAlign};
      }
  `}
  ${({ lgAlign }) =>
    lgAlign &&
    `
      @media (min-width: 992px) {
        align-items: ${lgAlign};
      }
  `}
  ${({ xlAlign }) =>
    xlAlign &&
    `
      @media (min-width: 1200px) {
        align-items: ${xlAlign};
      }
  `}
`;

export default Row;
