import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormGroup = styled.div`
  margin-top: ${props => `${props.margin}px`};
`;

FormGroup.propTypes = {
  margin: PropTypes.number,
  children: PropTypes.any
};

FormGroup.displayName = 'FormGroup';

export default FormGroup;
