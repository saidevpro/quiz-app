import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({ margin, children }) => <div style={{ marginTop: `${margin}px` }}>{children}</div>;

FormGroup.propTypes = {
  margin: PropTypes.number,
  children: PropTypes.any
};

export default FormGroup;
