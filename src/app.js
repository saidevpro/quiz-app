import React from 'react';
import './app.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateQuizPage from './pages/createquizpage';
import QuizzesPage from './pages/quizzes';

React;

export default () => (
  <Router>
    <Switch>
      <Route path="/create/quiz" component={CreateQuizPage} />
      <Route path="/quizzes" component={QuizzesPage} />
    </Switch>
  </Router>
);
