/* eslint-disable react/button-has-type */
import React from 'react';
import './button.scss';
import PropTypes from 'prop-types';

const Button = ({ children, ...otherProps }) => <button {...otherProps}>{children}</button>;

Button.defaultProps = {
  type: 'button'
};

Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.string
};

Button.displayName = 'Button';

export default Button;
