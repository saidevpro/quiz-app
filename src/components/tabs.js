import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TabsS = ({ children, onChange, defaultActive, style, className, onTabClick }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActive || 0);

  function handleTabClick(event) {
    const index = Number(event.target.dataset.id);

    setActiveIndex(index);
    onChange(event, index);
    onTabClick(event);
  }

  return (
    <div className={className}>
      {React.Children.map(children, (tab, index) => {
        return React.cloneElement(tab, {
          onClick: handleTabClick,
          isActive: activeIndex === index,
          index
        });
      })}
    </div>
  );
};

TabsS.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  onTabClick: PropTypes.func,
  defaultActive: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string
};

const Tabs = styled(TabsS)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 10px;
  border-bottom: 1px solid #aaaaaa;
  background-color: #ffffff;
`;

export default Tabs;
