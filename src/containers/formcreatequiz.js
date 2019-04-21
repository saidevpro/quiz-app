import React from 'react';
import styled from 'styled-components';
import Button from '../components/button';
import Input from '../components/input/input';
import Textarea from '../components/input/textarea';
import Label from '../components/label';
import FormGroup from '../components/formgroup';
import PopUpOver from '../components/popupover';
import Loader from '../components/loader';

const LinkRemove = styled.button`
  text-decoration: underline;
  font-size: 0.65rem;
  background: none;
  border: none;
  color: #9e0606;
  float: right;
  cursor: pointer;
`;

const ParagraphLoader = styled.p`
  font-weight: 300;
  color: #616161;
  font-size: 1.1rem;
`;

class FormCreateQuiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indexResponse: 1,
      responses: [1]
    };

    this.addResponse = this.addResponse.bind(this);
    this.removeResponse = this.removeResponse.bind(this);
  }

  addResponse() {
    this.setState(state => ({
      indexResponse: state.indexResponse + 1,
      responses: state.responses.concat(state.indexResponse + 1)
    }));
  }

  removeResponse(event) {
    event.preventDefault();
    const index = event.target.getAttribute('data-id');

    this.setState(state => ({
      responses: state.responses.filter(value => value !== parseInt(index, 10))
    }));
  }

  render() {
    const { responses } = this.state;

    return (
      <form action="">
        <PopUpOver>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <Loader />
            <ParagraphLoader>Please wait for a moment.</ParagraphLoader>
          </div>
        </PopUpOver>
        <FormGroup>
          <Label
            style={{
              marginBottom: '17px'
            }}
          >
            Categories
          </Label>
          <Label className="label-checkbox">
            <Input type="checkbox" className="input-checkbox" />
            HTML
          </Label>
          <Label className="label-checkbox">
            <Input type="checkbox" className="input-checkbox" />
            PHP
          </Label>
          <Label className="label-checkbox">
            <Input type="checkbox" className="input-checkbox" />
            CSS
          </Label>
          <Label className="label-checkbox">
            <Input type="checkbox" className="input-checkbox" />
            JAVASCRIPT
          </Label>
        </FormGroup>
        <FormGroup margin="20">
          <Label>Question ?</Label>
          <Textarea
            style={{
              width: '100%'
            }}
            placeholder="e.g. What this code does ?"
            rows="3"
          />
        </FormGroup>
        <FormGroup margin="20">
          <Label>Description</Label>
          <Textarea
            style={{
              width: '100%'
            }}
            placeholder="e.g. the code does for the first"
            rows="4"
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
                className="input-text"
                placeholder="e.g. the function will return"
                style={{
                  width: '100%'
                }}
              />
              <LinkRemove onClick={this.removeResponse} data-id={value}>
                Remove
              </LinkRemove>
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
            <Button className="button button-primary">Create the quiz</Button>
          </div>
        </FormGroup>
      </form>
    );
  }
}

export default FormCreateQuiz;
