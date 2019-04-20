import React from 'react';
import './app.scss';

// Testing components
import Button from './components/button';
import Input from './components/input/input';
import Textarea from './components/input/textarea';
import Label from './components/label';
import FormGroup from './components/formgroup';

export default class App extends React.Component {
  render() {
    return (
      <div style={{ margin: '60px auto', maxWidth: '500px' }} className="container">
        <form action="">
          <FormGroup margin="17">
            <Label>Question ?</Label>
            <Input type="text" className="input-text" placeholder="e.g: David" style={{ width: '100%' }} />
          </FormGroup>
          <FormGroup margin="17">
            <Label>Description</Label>
            <Textarea style={{ width: '100%' }} placeholder="Enter de question" rows="4" />
          </FormGroup>
          <FormGroup margin="17">
            <Label>Response</Label>
            <Input type="text" className="input-text" placeholder="e.g: David" style={{ width: '100%' }} />
          </FormGroup>
          <FormGroup margin="25">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button className="button button-danger">Add response</Button>
              <Button className="button button-primary">Create</Button>
            </div>
          </FormGroup>
        </form>
      </div>
    );
  }
}
