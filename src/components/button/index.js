import React from 'react';
import './button.scss';
import PropTypes from 'prop-types';

const Button = props => <button {...props}>{props.children}</button>;

Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default Button;
