import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 10px;
  border-bottom: 1px solid #aaaaaa;
  background-color: #ffffff;
`;

function Tabs({ children, onChange, defaultActive, style }) {
  const [activeIndex, setActiveIndex] = useState(defaultActive || 0);

  function handleTabClick(event) {
    const index = Number(event.target.dataset.id);

    setActiveIndex(index);
    onChange(event, index);
  }

  return (
    <StyledTabs style={style}>
      {React.Children.map(children, (tab, index) => {
        return React.cloneElement(tab, {
          onClick: handleTabClick,
          isActive: activeIndex === index,
          index
        });
      })}
    </StyledTabs>
  );
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  defaultActive: PropTypes.number
};

export default Tabs;
