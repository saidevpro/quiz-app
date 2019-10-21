import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Box from '../components/box';
import Container from '../components/container-responsive';
import Logo from '../images/logo.png';
import FormRegister from '../components/formregister';
import ErrorModal from '../components/floatingerrorcard';
import { validateUserRegisterData } from '../../utils/validation';
import { getValidationErrorMessages, formatUrl } from '../helper';
import Auth from '../helper/auth';

const RegisterCard = styled.div`
  margin-top: 3rem;
  padding: 1rem;
`;

const LogoCard = styled.div`
  text-align: center;
  img {
    height: 3rem;
  }
`;

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    this.auth = new Auth();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleErrorModalClose = this.handleErrorModalClose.bind(this);
  }
  handleFormSubmit(event, formData) {
    event.preventDefault();

    const validator = validateUserRegisterData(formData);

    if (validator.fails()) {
      const messages = getValidationErrorMessages(validator);
      return this.setState({ errors: messages });
    }

    this.handleErrorModalClose();

    this.auth
      .register(
        formData.username,
        formData.email,
        formData.password,
        formData.password_confirmation,
        formData.remember
      )
      .then(({ data }) => {
        this.auth.setUserToken(data.token);
        alert('User created successfully');
      })
      .catch(error => {
        const message = error.response ? error.response.data.message : error.message;
        this.setState({ errors: [message] });
      });
  }

  handleErrorModalClose() {
    this.setState({ errors: [] });
  }

  render() {
    const { errors } = this.state;

    return (
      <>
        <ErrorModal isOpen={!_.isEmpty(errors)} onClose={this.handleErrorModalClose}>
          <ul style={{ listStyle: 'none' }}>
            {errors.map((error, key) => (
              <li key={key}>&#10007;&nbsp;{error}</li>
            ))}
          </ul>
        </ErrorModal>
        <Box itemPosition="center" style={{ width: '100vw', height: '100vh' }}>
          <Container xl={4} lg={5} md={7} sm={8}>
            <RegisterCard>
              <LogoCard>
                <img src={Logo} alt="website logo" />
              </LogoCard>
              <br />
              <br />
              <FormRegister onSubmit={this.handleFormSubmit} />
              <br />
              <Link to="/admin/login">I have an account</Link>
            </RegisterCard>
          </Container>
        </Box>
      </>
    );
  }
}

export default RegisterPage;
