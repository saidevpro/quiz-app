import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${props => props.itemPosition};
  flex-direction: ${props => props.itemDirection};
  align-items: ${props => props.itemAlignment};
`;

Box.defaultProps = {
  itemPosition: 'initial',
  itemDirection: 'row',
  itemAlignment: 'initial'
};

Box.propTypes = {
  itemPosition: PropTypes.string,
  itemDirection: PropTypes.string,
  itemAlignment: PropTypes.string
};

export default Box;
