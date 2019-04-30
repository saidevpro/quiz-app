import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSwitch = styled.div`
  display: block;
  overflow: hidden;
`;

function Switcher({ children, activeItem }) {
  return (
    <StyledSwitch>
      {React.Children.map(children, (child, index) => {
        return index === activeItem ? child : null;
      })}
    </StyledSwitch>
  );
}

Switcher.propTypes = {
  children: PropTypes.node.isRequired,
  activeItem: PropTypes.number
};

export default Switcher;
