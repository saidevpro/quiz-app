import React from 'react';
import styled from 'styled-components';
import Validator from 'validatorjs';
import axios from 'axios';
import FormCreateQuiz from '../containers/formcreatequiz';
import Header from '../components/header';
import Container from '../components/container-responsive';
import Space from '../components/space';
import Loader from '../components/loader';
import Modal from '../components/modal';
import ErrorModal from '../components/errormodal';
import { API_URL } from '../constants';

const ErrorDataValidationCard = styled(ErrorModal)`
  position: fixed;
  top: 6.5rem;
  right: 1rem;
`;

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
    Quiz was created successfully. <br />
    <a href="quiz/525">Click here</a> to see the quiz.
  </Center>
);

export default class CreateQuizPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      hasError: false,
      openModal: false,
      dataFailsMessages: [],
      shouldResetForm: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleDataValidationFailureClose = this.handleDataValidationFailureClose.bind(this);
  }

  handleFormSubmit(data) {
    const validator = this.validateData(data);

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
      dataFailsMessages: []
    });

    axios
      .post(`${API_URL}/quiz`, data)
      .then(response => {
        console.log(response);
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
    this.setState({ dataFailsMessages: errors_messages });
  }

  handleDataValidationFailureClose() {
    this.setState({ dataFailsMessages: [] });
  }

  validateData(data) {
    const { question, categories, correct_response, responses, description } = data;

    return new Validator(
      { question, categories, responses, correct_response, description },
      {
        categories: 'required|array',
        question: 'required|string',
        description: 'required|string',
        responses: 'required|array',
        correct_response: 'required'
      }
    );
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
    const { openModal, fetching, hasError, shouldResetForm, dataFailsMessages } = this.state;

    return (
      <React.Fragment>
        <Header />
        <Space size={7} />
        <Modal isOpen={openModal} onClose={this.handleModalClose}>
          {fetching ? (
            <FetchLoader />
          ) : hasError ? (
            <ErrorParagraph children="Sorry! something goes wrong" />
          ) : (
            <Done />
          )}
        </Modal>
        <ErrorDataValidationCard
          isOpen={!_.isEmpty(dataFailsMessages)}
          handleClose={this.handleDataValidationFailureClose}
        >
          <ul style={{ listStyle: 'none' }}>
            {dataFailsMessages.map((message, key) => (
              <li key={key}>&#10007;&nbsp;{message}</li>
            ))}
          </ul>
        </ErrorDataValidationCard>
        <main style={{ marginBottom: '30px' }}>
          <Container xl={5} lg={7} md={10} xs={12}>
            <FormCreateQuiz onSubmit={this.handleFormSubmit} isReset={shouldResetForm} />
          </Container>
        </main>
      </React.Fragment>
    );
  }
}
