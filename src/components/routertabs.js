import React, { useState } from 'react';
import styled from 'styled-components';

const RouterTabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 10px;
  border-bottom: 1px solid #aaaaaa;
  background-color: #ffffff;
`;

RouterTabs.displayName = 'RouterTabs';

export default RouterTabs;
