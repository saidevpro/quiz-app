import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Select = ({ options, ...props }) => {
  return (
    <select {...props}>
      {Object.keys(options).forEach(key => (
        <option value={key}>{options[key]}</option>
      ))}
    </select>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  type: PropTypes.string,
  options: PropTypes.object
};

export default Select;
