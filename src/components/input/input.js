import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

const Input = ({ type, name, id, className, style, onClick, onChange, placeholder, dataId, value }) => (
  <input
    type={type}
    name={name}
    id={id}
    className={className}
    style={style}
    onChange={onChange}
    onClick={onClick}
    placeholder={placeholder}
    data-id={dataId}
    value={value}
    autoComplete="off"
  />
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default Input;
