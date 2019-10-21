import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FormGroup from './formgroup';
import Label from './label';
import Input from './input/input';
import Button from './button';

const InputFull = styled(Input)`
  width: 100%;
`;

class FormRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      remember: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, type, value } = event.target;

    this.setState({
      [name]: !(type === 'checkbox') ? value : event.target.checked
    });
  }

  handleSubmit(event) {
    const { username, email, password, password_confirmation, remember } = this.state;

    this.props.onSubmit(event, { username, email, password, password_confirmation, remember });
  }

  render() {
    const { username, email, password, password_confirmation, remember } = this.state;

    return (
      <form action="/login" method="post" onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <InputFull
            type="text"
            name="username"
            placeholder="e.g. said"
            id="username"
            value={username}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup margin={15}>
          <Label htmlFor="email">Email</Label>
          <InputFull
            type="email"
            name="email"
            placeholder="e.g. user@email.io"
            id="email"
            value={email}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup margin={15}>
          <Label htmlFor="password">Password</Label>
          <InputFull
            type="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup margin={15}>
          <Label htmlFor="password">Password Confirmation</Label>
          <InputFull
            type="password"
            name="password_confirmation"
            placeholder="********"
            value={password_confirmation}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup margin={25}>
          <Button type="submit" className="button button-primary">
            Register
          </Button>
        </FormGroup>
      </form>
    );
  }
}

FormRegister.propTypes = {
  onSubmit: PropTypes.func
};

export default FormRegister;
