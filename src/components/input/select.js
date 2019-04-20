import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Select = props => {
  return (
    <select {...props}>
      {Object.keys(props.options).forEach(key => (
        <option value={key}>{props.options[key]}</option>
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
  option: PropTypes.object
};

export default Select;
