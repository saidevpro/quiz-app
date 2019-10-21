import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Box from '../components/box';
import Container from '../components/container-responsive';
import Logo from '../images/logo.png';
import FormLogin from '../components/formlogin';
import FloatingErrorCard from '../components/floatingerrorcard';
import { validateUserLoginData } from '../../utils/validation';
import { getValidationErrorMessages } from '../helper';

const LoginCard = styled.div`
  margin-top: 5rem;
  padding: 1rem;
`;

const LogoCard = styled.div`
  text-align: center;
  img {
    height: 3rem;
  }
`;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleErrorModalClose = this.handleErrorModalClose.bind(this);
  }
  handleFormSubmit(event, formData) {
    const validator = validateUserLoginData(formData);

    if (validator.fails()) {
      event.preventDefault();
      const messages = getValidationErrorMessages(validator);
      return this.setState({ errors: messages });
    }
  }

  handleErrorModalClose() {
    this.setState({ errors: [] });
  }

  render() {
    const { errors } = this.state;

    return (
      <>
        <FloatingErrorCard isOpen={!_.isEmpty(errors)} onClose={this.handleErrorModalClose}>
          <ul style={{ listStyle: 'none' }}>
            {errors.map((error, key) => (
              <li key={key}>&#10007;&nbsp;{error}</li>
            ))}
          </ul>
        </FloatingErrorCard>
        <Box itemPosition="center" style={{ width: '100%', height: '100vh' }}>
          <Container xl={4} lg={5} md={7} sm={8}>
            <LoginCard>
              <LogoCard>
                <img src={Logo} alt="website logo" />
              </LogoCard>
              <br />
              <br />
              <FormLogin onSubmit={this.handleFormSubmit} />
              <br />
              <Link to="/admin/register">I'm new user</Link>
            </LoginCard>
          </Container>
        </Box>
      </>
    );
  }
}

export default LoginPage;
