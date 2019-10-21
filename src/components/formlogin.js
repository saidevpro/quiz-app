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

class FormLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
    const { email, password, remember } = this.state;
    this.props.onSubmit(event, { email, password, remember });
  }

  render() {
    const { email, password, remember } = this.state;

    return (
      <form action="/admin/login" method="post" onSubmit={this.handleSubmit}>
        <FormGroup>
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
          <Label htmlFor="remember" className="label-checkbox">
            <Input
              type="checkbox"
              name="remember"
              id="remember"
              className="input-checkbox"
              checked={remember}
              onChange={this.handleInputChange}
            />
            keep me sign in.
          </Label>
        </FormGroup>
        <FormGroup margin={25}>
          <Button type="submit" className="button button-primary">
            Login
          </Button>
        </FormGroup>
      </form>
    );
  }
}

FormLogin.propTypes = {
  onSubmit: PropTypes.func
};

export default FormLogin;
