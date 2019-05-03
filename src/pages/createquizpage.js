import React from 'react';
import FormCreateQuiz from '../containers/formcreatequiz';
import styled from 'styled-components';
import Header from '../components/header';
import Container from '../components/container-responsive';
import Space from '../components/space';
import Loader from '../components/loader';
import Modal from '../components/modal';

const Error = styled.p`
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
      openModal: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

    this.form = React.createRef();
  }

  handleFormSubmit(data) {
    this.setState({
      fetching: true,
      openModal: true
    });

    const FakePromise = new Promise((resolve, reject) => {
      // reject();
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    FakePromise.then(res =>
      this.setState({
        fetching: false,
        hasError: false
      })
    );

    FakePromise.catch(_ =>
      this.setState({
        fetching: false,
        hasError: true
      })
    );
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
    const { openModal, fetching, hasError } = this.state;

    return (
      <React.Fragment>
        <Header />
        <Space size={7} />
        <Modal isOpen={openModal} onClose={this.handleModalClose}>
          {fetching ? <FetchLoader /> : hasError ? <Error children="Sorry! something goes wrong" /> : <Done />}
        </Modal>
        <main style={{ marginBottom: '30px' }}>
          <Container xl={5} lg={7} md={10} xs={12}>
            <FormCreateQuiz onSubmit={this.handleFormSubmit} ref={this.form} />
          </Container>
        </main>
      </React.Fragment>
    );
  }
}
