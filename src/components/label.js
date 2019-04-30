import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 1rem;
  &.label-checkbox {
    cursor: pointer;
  }
`;

Label.propTypes = {
  htmlFor: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

Label.displayName = 'label';

export default Label;
