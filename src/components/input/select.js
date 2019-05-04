import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Select = ({ options, defaultOption, ...props }) => {
  return (
    <select {...props}>
      {defaultOption ? (
        <option value="" disabled>
          {defaultOption}
        </option>
      ) : null}
      {Object.keys(options).map(key => (
        <option value={key} key={key}>
          {options[key]}
        </option>
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
