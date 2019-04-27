import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Button from '../components/button';
import Input from '../components/input/input';
import Textarea from '../components/input/textarea';
import Label from '../components/label';
import FormGroup from '../components/formgroup';
import { MIN_RESPONSE } from '../constants/app.config';

const LinkRemove = styled.button`
  text-decoration: underline;
  font-size: 0.65rem;
  background: none;
  border: none;
  color: #9e0606;
  float: right;
  cursor: pointer;
`;

function createRandomIndex() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

class FormCreateQuiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responses: _.fill(Array(MIN_RESPONSE), 1).map(_v => createRandomIndex()),
      inputs: {}
    };

    this.addResponse = this.addResponse.bind(this);
    this.removeResponse = this.removeResponse.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputEmbedChange = this.handleInputEmbedChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addResponse() {
    this.setState(state => ({
      responses: state.responses.concat(createRandomIndex())
    }));
  }

  removeResponse(event) {
    event.preventDefault();
    const index = event.target.dataset.id;
    const { name } = event.target;

    this.setState(state => {
      if (state.inputs[name]) {
        const elements = state.inputs[name];
        _.unset(elements, `response_${index}`);

        return {
          responses: state.responses.filter(value => value !== index),
          inputs: {
            ...state.inputs,
            [name]: {
              ...elements
            }
          }
        };
      }
      return {
        responses: state.responses.filter(value => value !== index)
      };
    });
  }

  handleInputChange(event) {
    const input = event.target;

    this.setState(state => ({
      inputs: {
        ...state.inputs,
        [input.name]: input.value
      }
    }));
  }

  handleInputEmbedChange(event) {
    const { inputs } = this.state;
    const { type, name, value, checked } = event.target;
    const dataId = event.target.dataset.id;

    if (type === 'checkbox' && !checked && inputs[name]) {
      this.setState(state => {
        const elements = state.inputs[name];
        _.unset(elements, dataId);

        return {
          inputs: {
            ...state.inputs,
            [name]: {
              ...elements
            }
          }
        };
      });

      return;
    }

    this.setState(state => ({
      inputs: {
        ...state.inputs,
        [name]: {
          ...state.inputs[name],
          [dataId]: value
        }
      }
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const { inputs } = this.state;
    const { onSubmit } = this.props;

    onSubmit(inputs);
  }

  render() {
    const { responses } = this.state;
    return (
      <form action="" ref={this.form}>
        <FormGroup>
          <Label
            style={{
              marginBottom: '17px'
            }}
          >
            Categories
          </Label>
          <Label className="label-checkbox">
            <Input
              type="checkbox"
              className="input-checkbox"
              name="categories"
              onChange={this.handleInputEmbedChange}
              dataId="category1"
              value="html"
            />
            HTML
          </Label>
          <Label className="label-checkbox">
            <Input
              type="checkbox"
              className="input-checkbox"
              name="categories"
              onChange={this.handleInputEmbedChange}
              dataId="category2"
              value="php"
            />
            PHP
          </Label>
          <Label className="label-checkbox">
            <Input
              type="checkbox"
              className="input-checkbox"
              name="categories"
              onChange={this.handleInputEmbedChange}
              dataId="category3"
              value="css"
            />
            CSS
          </Label>
          <Label className="label-checkbox">
            <Input
              type="checkbox"
              className="input-checkbox"
              name="categories"
              onChange={this.handleInputEmbedChange}
              dataId="category4"
              value="javascript"
            />
            JAVASCRIPT
          </Label>
        </FormGroup>
        <FormGroup margin="20">
          <Label>Question ?</Label>
          <Textarea
            name="question"
            style={{
              width: '100%'
            }}
            placeholder="e.g. What this code does ?"
            rows="3"
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup margin="20">
          <Label>Description</Label>
          <Textarea
            name="description"
            style={{
              width: '100%'
            }}
            placeholder="e.g. the code does for the first"
            rows="4"
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup margin="20">
          <Label>Response</Label>
          {responses.map(value => (
            <div
              style={{
                position: 'relative',
                marginBottom: '20px'
              }}
              key={value}
            >
              <Input
                type="text"
                name="responses"
                className="input-text"
                placeholder="e.g. the function will return"
                style={{
                  width: '100%'
                }}
                onChange={this.handleInputEmbedChange}
                dataId={`response_${value}`}
              />
              {responses.length > MIN_RESPONSE && (
                <LinkRemove onClick={this.removeResponse} data-id={value} name="responses">
                  remove
                </LinkRemove>
              )}
            </div>
          ))}
        </FormGroup>
        <FormGroup margin="40">
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
              Create the quiz
            </Button>
          </div>
        </FormGroup>
      </form>
    );
  }
}

export default FormCreateQuiz;
