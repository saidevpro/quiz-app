import React from 'react';
import styled from 'styled-components';

const Space = styled.div`
  margin-top: ${props => `${props.size}rem`};
`;

Space.displayName = 'Space';

export default Space;
