import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '../components/button';
import Input from '../components/input/input';
import Textarea from '../components/input/textarea';
import Select from '../components/input/select';
import Label from '../components/label';
import FormGroup from '../components/formgroup';
import FetchableData from '../containers/fetchabledata';
import { MIN_RESPONSE, API_URL, API_QUIZ_PATH } from '../constants';
import { formatUrl } from '../helper';

const LinkRemove = styled.button`
  text-decoration: underline;
  font-size: 0.65rem;
  background: none;
  border: none;
  color: #9e0606;
  float: right;
  cursor: pointer;
`;

const fetchLanguage = () => {
  return axios.get(`${API_URL}/categories`);
};

class FormUpdateQuiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      question: '',
      body: '',
      response_description: '',
      responses: Array(MIN_RESPONSE).fill(''),
      correct_response: ''
    };

    this.addResponse = this.addResponse.bind(this);
    this.removeResponse = this.removeResponse.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { quizId } = this.props;
    const url = formatUrl(API_URL, API_QUIZ_PATH, quizId);

    axios.get(url).then(({ data }) => {
      const {
        categories,
        question,
        body,
        response_description,
        responses,
        correct_response
      } = data;
      this.setState({
        categories,
        question,
        body,
        response_description,
        responses,
        correct_response
      });
    });
  }

  addResponse() {
    this.setState(state => ({
      responses: state.responses.concat([''])
    }));
  }

  removeResponse(event) {
    event.preventDefault();
    const index = Number(event.target.dataset.id);

    this.setState(state => {
      const { responses } = state;
      const isCorrectResponse = responses[index] === state.correct_response;

      delete responses[index];

      return {
        responses,
        correct_response: !isCorrectResponse ? state.correct_response : ''
      };
    });
  }

  handleInputChange(event) {
    const { value, name, type, checked } = event.target;
    const index = event.target.dataset.id;

    if (Array.isArray(this.state[name])) {
      this.setState(state => {
        const input = state[name];

        if (type === 'checkbox' && checked) {
          input.push(value);
        } else if (type === 'checkbox' && !checked) {
          _.pull(input, value);
        } else {
          input[index] = value;
        }
        return {
          [name]: input
        };
      });

      return;
    }

    this.setState(state => ({
      [name]: value
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      categories,
      question,
      body,
      response_description,
      responses,
      correct_response
    } = this.state;
    const { onSubmit } = this.props;

    onSubmit({
      categories,
      question,
      body,
      response_description,
      responses,
      correct_response
    });
  }

  render() {
    const {
      categories,
      responses,
      question,
      body,
      response_description,
      correct_response
    } = this.state;

    const correct_response_options = {};
    responses.forEach(response => {
      if (response) {
        correct_response_options[response] = response;
      }
    });

    return (
      <form action="" ref={this.form}>
        <FetchableData asynchFunc={fetchLanguage}>
          {languages => (
            <FormGroup>
              <Label
                style={{
                  marginBottom: '17px'
                }}
              >
                Categories
              </Label>
              {languages.map((language, index) => (
                <Label className="label-checkbox" key={language}>
                  <Input
                    type="checkbox"
                    value={language}
                    name="categories"
                    checked={categories.includes(language)}
                    onChange={this.handleInputChange}
                    className="input-checkbox"
                  />
                  {language.toLowerCase()}
                </Label>
              ))}
            </FormGroup>
          )}
        </FetchableData>
        <FormGroup margin={20}>
          <Label>Question ?</Label>
          <Textarea
            name="question"
            value={question}
            style={{
              width: '100%'
            }}
            placeholder="e.g. What this code does ?"
            rows="3"
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup margin={20}>
          <Label>Content</Label>
          <Textarea
            name="body"
            value={body}
            style={{
              width: '100%'
            }}
            placeholder="e.g. the code does for the first"
            rows="6"
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup margin={20}>
          <Label>Response description</Label>
          <Textarea
            name="response_description"
            value={response_description}
            style={{
              width: '100%'
            }}
            placeholder="e.g. the code does for the first"
            rows="6"
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup margin={20}>
          <Label>Responses</Label>
          {responses.map((value, key) => (
            <div
              style={{
                position: 'relative',
                marginBottom: '20px'
              }}
              key={key}
            >
              <Input
                type="text"
                name="responses"
                value={value}
                className="input-text"
                placeholder="e.g. the function will return"
                style={{
                  width: '100%'
                }}
                onChange={this.handleInputChange}
                dataId={key}
              />
              <LinkRemove
                onClick={this.removeResponse}
                data-id={key}
                name="responses"
                tabIndex="-1"
              >
                remove
              </LinkRemove>
            </div>
          ))}
        </FormGroup>
        <FormGroup margin={20}>
          <Label>Correct Response</Label>
          <Select
            name="correct_response"
            value={correct_response}
            options={correct_response_options}
            style={{ width: '100%' }}
            defaultOption="Choose the correct response"
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup margin={40}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Button type="button" className="button button-danger" onClick={this.addResponse}>
              +1 Response
            </Button>
            <Button className="button button-primary" onClick={this.handleSubmit}>
              update the quiz
            </Button>
          </div>
        </FormGroup>
      </form>
    );
  }
}

FormUpdateQuiz.getDerivedStateFromProps = (props, state) => {
  if (props.isReset) {
    return {
      categories: [],
      question: '',
      description: '',
      responses: Array(MIN_RESPONSE).fill(''),
      correct_response: ''
    };
  }

  return null;
};

FormUpdateQuiz.propTypes = {
  onSubmit: PropTypes.func
};

export default FormUpdateQuiz;
