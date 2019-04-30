import React from 'react';
import styled from 'styled-components';

const Gap = styled.div`
  margin-top: ${props => props.size + 'rem'};
`;

Gap.displayName = 'Space';

export default Gap;
