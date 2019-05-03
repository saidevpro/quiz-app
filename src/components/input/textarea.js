import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Textarea = ({ children, ...props }) => {
  return <textarea {...props}>{children}</textarea>;
};

Textarea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  type: PropTypes.string,
  option: PropTypes.object,
  children: PropTypes.any
};

export default Textarea;
