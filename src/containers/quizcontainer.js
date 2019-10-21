import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import CardCode from '../components/cardcode';
import Loader from '../components/loader';
import Modal from '../components/modal';
import Button from '../components/button';
import { fetchQuizUrlFormat } from '../helper';
import { API_URL, API_QUIZ_PATH } from '../constants';
import { formatUrl } from '../helper';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 0;
`;

const Response = styled.div`
  position: relative;
  margin: 5px 0;
  padding: 8px 15px;
  background-color: #f5f2f0;
  border: 1px solid #e0e0e0;
  padding-left: 2rem;
  &:after {
    content: '➤';
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.8rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    font-size: 0.7rem;
  }
`;

const QuizComponent = styled.div`
  margin-bottom: 50px;
`;

const OptionsContainer = styled.div`
  margin-top: 20px;
`;

class QuizContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: [],
      deleteId: null,
      isLoading: true
    };

    this.handleDeleteQuiz = this.handleDeleteQuiz.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props.category);
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.fetchData(this.props.category);
    }
  }

  fetchData(category) {
    const url = fetchQuizUrlFormat(category);

    this.setState({ isLoading: true });

    axios.get(url).then(({ data }) => {
      this.setState({ quizzes: data, isLoading: false });
    });
  }

  handleDeleteQuiz(event) {
    event.preventDefault();
    const { deleteId } = this.state;

    const url = formatUrl(API_URL, API_QUIZ_PATH);

    axios.delete(url, { data: { id: deleteId } }).then(response => {
      this.setState(state => ({
        deleteId: null,
        quizzes: state.quizzes.filter(quiz => quiz._id !== deleteId)
      }));
    });
  }

  handleOpenModal(event) {
    event.preventDefault();
    const { id } = event.target.dataset;

    this.setState({
      deleteId: id
    });
  }

  handleCloseModal(event) {
    event.preventDefault();

    this.setState({
      deleteId: false
    });
  }

  render() {
    const { deleteId, quizzes, isLoading } = this.state;

    if (isLoading) {
      return (
        <LoaderContainer>
          <Loader size={0.5} />
        </LoaderContainer>
      );
    }

    if (_.isEmpty(quizzes)) {
      return (
        <p style={{ marginTop: '30px', textAlign: 'center' }}>
          Oupppssss!
          <br /> There is not quiz to show
        </p>
      );
    }

    return (
      <React.Fragment>
        <section>
          {quizzes.map((Quiz, key) => (
            <QuizComponent key={key}>
              <h3>{Quiz.question}</h3>
              <CardCode theme="hidden" language={Quiz.categories}>
                {Quiz.body}
              </CardCode>
              {/* {Quiz.responses.map((response, key) => (
                <Response key={key}>{response}</Response>
              ))} */}
              <OptionsContainer>
                <NavLink
                  to={`/admin/update/quiz/${Quiz._id}`}
                  className="button button-primary"
                  style={{ marginRight: '15px' }}
                >
                  update
                </NavLink>
                <button
                  type="button"
                  className="button button-danger"
                  data-id={Quiz._id}
                  onClick={this.handleOpenModal}
                >
                  delete
                </button>
              </OptionsContainer>
            </QuizComponent>
          ))}
        </section>
        {deleteId && (
          <Modal isOpen onClose={this.handleCloseModal}>
            <div>
              <p>
                Vous êtes sur le point de supprimer le quiz. Êtes-vous sûre de vouloir effectuer
                cette action ?
              </p>
              <div style={{ textAlign: 'right' }}>
                <Button
                  className="button button-primary"
                  type="button"
                  style={{ marginRight: '15px' }}
                  onClick={this.handleCloseModal}
                >
                  Annuler
                </Button>
                <Button
                  className="button button-danger"
                  type="button"
                  onClick={this.handleDeleteQuiz}
                >
                  confirmer
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

QuizContainer.propTypes = {
  category: PropTypes.string
};

export default QuizContainer;
