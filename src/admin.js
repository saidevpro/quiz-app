import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AdminApp as App } from './app';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
