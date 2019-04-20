import React from 'react';
import PropTypes from 'prop-types';
import './label.scss';

const Label = props => <label {...props}>{props.children}</label>;

Label.propTypes = {
  htmlFor: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Label;
