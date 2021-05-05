import React from 'react';
import Styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { css } from 'emotion';
import StatsReport from '../components/statsreport';
import Header from '../components/header/front-header';
import Container from '../components/container-responsive';
import Space from '../components/space';
import Row from '../components/row';
import Column from '../components/column';
import QuizQuestion from '../components/question';
import Modal from '../components/modal';
import Text from '../components/text';
import Loader from '../components/loader';
import { isUser } from 'babel-types';

const animateThumb = keyframes`
  0% {
      transform: scale(0.2);
  } 50% {
      transform: scale(1.5);
  } 100% {
      transform: scale(1);
  }
`;

const PageModal = Styled(Modal)`
  .modal-content {
    background-color: initial;
    border: none;
  }
  .svg-thumb-up {
    animation: ${animateThumb} .3s linear;
  }
`;

const PageHeader = Styled(Header)`
  @media (max-width: 768px){
    box-shadow: none;
    border-bottom: 1px solid #e0e0e0;
  }
`;

const Statistics = Styled(StatsReport)`
  @media (max-width: 768px){
    position: absolute;
    top: calc(2.6rem);
    left: 0;
    right: 0;
    padding: 0.6rem 1rem;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    background: #ffffff;
    & > ul {
      display: flex;
      justify-content: space-between; 
      font-size: 10px;
      text-align: center;
      li {
        margin: 0;
      }
      .stat-language {
        & > .stat-lang-name, hr {
          display: none;
        }
      }
    }
  }
`;

const NoticeContainer = Styled.div`
  padding: 0.7rem 0;
  border-bottom: 1px solid #e0e0e0;
  background-color:  #fff;
  z-index: 2;
  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.12), 0 -1px 2px rgba(0, 0, 0, 0.24);
  }
`;
class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.question_ids = [];

    this.state = {
      currentQuestion: null,
      userTrueResponseCount: 0,
      numberOfTotalQuestion: 0,
      currentQuestionRank: 0,
      hasNecessaryForPage: false,
      showResponseToUser: false,
      isUserResponseTrue: true,
      isFetchingQuestion: true,
      hasUserChooseAResponse: false,
      responseDescription: '',
      userResponse: '',
      currentQuestionTrueResponse: '',
      openModal: false
    };

    this.handleResponseChoice = this.handleResponseChoice.bind(this);
    this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this);
  }

  async componentDidMount() {
    const plang = this.props.match.params.plang;
    await axios
      .get('/api/plang/stats', {
        params: {
          plang
        }
      })
      .then(({ data }) => {
        this.setState({ numberOfTotalQuestion: data.count });
      })
      .catch(error => {
        console.error(error);
      });

    await axios
      .get('/api/game/question', {
        params: {
          plang,
          ids: this.question_ids
        }
      })
      .then(({ data }) => {
        this.setState(state => ({
          currentQuestion: data.question,
          currentQuestionRank: ++state.currentQuestionRank,
          isFetchingQuestion: false
        }));

        this.question_ids.push(data.question._id);
      })
      .catch(error => console.log(error));
    this.setState({ hasNecessaryForPage: true });
  }

  handleNextQuestionClick(e) {
    e.preventDefault();

    this.getTheNextQuestion();
  }

  getTheNextQuestion() {
    const plang = this.props.match.params.plang;
    axios
      .get('/api/game/question', {
        params: {
          plang,
          ids: this.question_ids
        }
      })
      .then(({ data }) => {
        this.setState(state => ({
          currentQuestion: data.question,
          currentQuestionRank: ++state.currentQuestionRank,
          isFetchingQuestion: false,
          showResponseToUser: false
        }));

        this.question_ids.push(data.question._id);
      })
      .catch(error => console.log(error));
  }

  handleResponseChoice(e) {
    e.preventDefault();
    if (this.state.showResponseToUser) return;

    const userResponse = e.target.innerText;
    const { currentQuestion } = this.state;

    this.setState({ hasUserChooseAResponse: true });

    axios
      .get('/api/game/response', {
        params: {
          id: currentQuestion._id
        }
      })
      .then(({ data }) => {
        const question = data.question;
        const isUserResponseTrue =
          question.correct_response.toLowerCase() === userResponse.toLowerCase();

        this.setState(state => ({
          showResponseToUser: true,
          openModal: true,
          userResponse,
          responseDescription: question.response_description,
          currentQuestionTrueResponse: question.correct_response,
          isUserResponseTrue,
          userTrueResponseCount: isUserResponseTrue
            ? ++state.userTrueResponseCount
            : state.userTrueResponseCount
        }));
      });
  }

  render() {
    const { plang } = this.props.match.params;
    const {
      numberOfTotalQuestion,
      userTrueResponseCount,
      currentQuestionRank,
      hasNecessaryForPage,
      isFetchingQuestion,
      currentQuestion: question,
      showResponseToUser,
      isUserResponseTrue,
      responseDescription,
      currentQuestionTrueResponse,
      userResponse
    } = this.state;

    return (
      <>
        <PageHeader />
        <Space size={2.7} />
        {!showResponseToUser ? null : (
          <NoticeContainer>
            <Container xl={7} lg={11} md={11}>
              <Row justify="center" smJustify="space-between" align="center">
                <Column style={{ paddingTop: '0.7rem', paddingBottom: '0.7rem' }}>
                  <strong style={{ color: isUserResponseTrue ? '#1d7d09' : '#f13636' }}>
                    {isUserResponseTrue ? (
                      <>&#10003;&nbsp;Good response</>
                    ) : (
                      <>&#10007;&nbsp;You missed out</>
                    )}
                  </strong>
                </Column>
                <Column>
                  {currentQuestionRank < numberOfTotalQuestion && (
                    <button className="button button-thin" onClick={this.handleNextQuestionClick}>
                      Go to the next question&nbsp;&#10230;
                    </button>
                  )}
                </Column>
              </Row>
            </Container>
          </NoticeContainer>
        )}
        <Space size={5.5} md={4.5} />
        <Container xl={7} lg={11} md={11}>
          {!hasNecessaryForPage ? (
            <Row justify="center">
              <Loader size={1.5} />
            </Row>
          ) : !question ? (
            <Row align="center" direction="column" style={{ textAlign: 'center' }}>
              <img
                src={`/assets/images/${plang}.lang.png`}
                alt={`${plang} programming language logo`}
                width="50"
                height="50"
              />
              <Space size={1} />
              <Text size="1.2rem" as="strong">
                Sorry. <br />
                No question to display for this language
              </Text>
            </Row>
          ) : (
            <Row justify="center" mdJustify="space-between">
              <Column flex={12} sm={10} md={8} lg={7}>
                {isFetchingQuestion ? (
                  <Row justify="center" align="center" style={{ height: '100%' }}>
                    <Loader size={0.7} />
                  </Row>
                ) : (
                  <QuizQuestion
                    language={plang}
                    code={!showResponseToUser ? question.body : responseDescription}
                    question={question.question}
                    responses={question.responses}
                    onChoose={this.handleResponseChoice}
                    trueResponse={currentQuestionTrueResponse}
                    showResponse={showResponseToUser}
                    userResponse={userResponse}
                  />
                )}
              </Column>
              <Column sm={3}>
                <Statistics
                  lang={plang}
                  totalQuestionCount={numberOfTotalQuestion}
                  goodResponsesCount={userTrueResponseCount}
                  numberOfCurrentQuestion={currentQuestionRank}
                />
              </Column>
            </Row>
          )}
        </Container>
      </>
    );
  }
}
export default GamePage;
