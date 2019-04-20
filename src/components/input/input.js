import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = props => {
  return <input {...props} />;
};

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string
};

export default Input;
