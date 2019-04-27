import React from 'react';
import FormCreateQuiz from '../containers/formcreatequiz';
import Header from '../components/headerquiz';
import Container from '../components/container-responsive';
import HeaderGapper from '../components/headergap';
import Loader from '../components/loader';
import Modal from '../components/popupover';

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
    this.setState({
      openModal: false
    });
  }

  render() {
    const { openModal, fetching, hasError } = this.state;

    let ModalContent;

    if (fetching) {
      ModalContent = (
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <Loader />
          <p>Please wait for a moment.</p>
        </div>
      );
    } else if (hasError) {
      ModalContent = (
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <p className="error">Sorry! something is wrong.</p>
        </div>
      );
    } else {
      ModalContent = (
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <p>
            Quiz was created successfully. <br />
            <a href="quiz/525">Click here</a> to see the quiz.
          </p>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Header />
        <HeaderGapper />
        <Modal isOpen={openModal} onClose={this.handleModalClose}>
          {ModalContent}
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
