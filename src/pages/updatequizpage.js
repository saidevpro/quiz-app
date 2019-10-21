import React from 'react';
import styled from 'styled-components';
import Validator from 'validatorjs';
import _ from 'lodash';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import FormUpdateQuiz from '../containers/formupdatequiz';
import Header from '../components/header/admin-header';
import Container from '../components/container-responsive';
import Space from '../components/space';
import Loader from '../components/loader';
import Modal from '../components/modal';
import FloatingErrorCard from '../components/floatingerrorcard';
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
    Quiz is updated successfully. <br />
    <NavLink to="/quizzes">Click here</NavLink> to see the quiz.
  </Center>
);

export default class UpdateQuizPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      hasError: false,
      openModal: false,
      isUpdated: false,
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
      openModal: true,
      errors: []
    });

    const quizId = this.props.match.params.id;

    axios
      .put(`${API_URL}/quiz/${quizId}`, data)
      .then(response => {
        this.setState({
          fetching: false,
          hasError: false,
          isUpdated: true
        });
      })
      .catch(Error => {
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
        openModal: false
      });
    }
  }

  render() {
    const { openModal, fetching, hasError, shouldResetForm, errors, isUpdated } = this.state;
    const quizId = this.props.match.params.id;

    if (isUpdated) {
      return <Redirect to="/admin/quizzes" />;
    }

    return (
      <React.Fragment>
        <Header />
        <Space size={5} />
        <Modal isOpen={openModal} onClose={this.handleModalClose}>
          {fetching ? (
            <FetchLoader />
          ) : hasError ? (
            <ErrorParagraph children="Sorry! something goes wrong" />
          ) : (
            <Done />
          )}
        </Modal>
        <FloatingErrorCard
          isOpen={!_.isEmpty(errors)}
          onClose={this.handleDataValidationFailureClose}
        >
          <ul style={{ listStyle: 'none' }}>
            {errors.map((message, key) => (
              <li key={key}>&#10007;&nbsp;{message}</li>
            ))}
          </ul>
        </FloatingErrorCard>
        <main style={{ marginBottom: '30px' }}>
          <Container xl={5} lg={7} md={10} sm={12}>
            <FormUpdateQuiz
              onSubmit={this.handleFormSubmit}
              isReset={shouldResetForm}
              quizId={quizId}
            />
          </Container>
        </main>
      </React.Fragment>
    );
  }
}
