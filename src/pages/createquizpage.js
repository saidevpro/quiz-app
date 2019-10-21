import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import FormCreateQuiz from '../containers/formcreatequiz';
import Header from '../components/header/admin-header';
import Container from '../components/container-responsive';
import Space from '../components/space';
import Loader from '../components/loader';
import Modal from '../components/modal';
import ErrorModal from '../components/floatingerrorcard';
import { validateQuizData } from '../../utils/validation';
import { API_URL } from '../constants';

const ErrorParagraph = styled.p`
  color: #9e0606;
`;

const Center = styled.div`
  text-align: center;
`;

const FetchLoader = props => (
  <Center>
    <Loader />
    <p>Please wait for a moment.</p>
  </Center>
);

const Done = props => (
  <Center>
    Quiz is created successfully. <br />
    <NavLink to="/admin/quizzes">Click here</NavLink> to see the quiz.
  </Center>
);

export default class CreateQuizPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      hasError: false,
      isRequesting: false,
      errors: [],
      shouldResetForm: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleDataValidationFailureClose = this.handleDataValidationFailureClose.bind(this);
  }

  handleFormSubmit(data) {
    const validator = validateQuizData(data);

    if (validator.fails()) {
      const fails = _.reduce(
        validator.errors.all(),
        (phrases, value, key) => {
          phrases.push(value[0]);
          return phrases;
        },
        []
      );

      return this.handleDataValidationFailure(fails);
    }

    this.setState({
      fetching: true,
      isRequesting: true,
      errors: []
    });

    axios
      .post(`${API_URL}/quiz`, data)
      .then(response => {
        this.setState({
          fetching: false,
          hasError: false
        });

        this.resetForm();
      })
      .catch(Error => {
        console.log(Error);
        this.setState({
          fetching: false,
          hasError: true
        });
      });
  }

  handleDataValidationFailure(errors_messages) {
    this.setState({ errors: errors_messages });
  }

  handleDataValidationFailureClose() {
    this.setState({ errors: [] });
  }

  resetForm() {
    this.setState({ shouldResetForm: true }, () => this.setState({ shouldResetForm: false }));
  }

  handleModalClose() {
    const { fetching } = this.state;

    if (!fetching) {
      this.setState({
        isRequesting: false
      });
    }
  }

  render() {
    const { isRequesting, fetching, hasError, shouldResetForm, errors } = this.state;

    return (
      <React.Fragment>
        <Header />
        <Space size={5} />
        <Modal isOpen={isRequesting} onClose={this.handleModalClose}>
          {fetching ? (
            <FetchLoader />
          ) : hasError ? (
            <ErrorParagraph children="Sorry! something goes wrong" />
          ) : (
            <Done />
          )}
        </Modal>
        <ErrorModal isOpen={!_.isEmpty(errors)} onClose={this.handleDataValidationFailureClose}>
          <ul style={{ listStyle: 'none' }}>
            {errors.map((message, key) => (
              <li key={key}>&#10007;&nbsp;{message}</li>
            ))}
          </ul>
        </ErrorModal>
        <main style={{ marginBottom: '30px' }}>
          <Container xl={5} lg={7} md={10} sm={12}>
            <FormCreateQuiz onSubmit={this.handleFormSubmit} reset={shouldResetForm} />
          </Container>
        </main>
      </React.Fragment>
    );
  }
}
